import { useParams, Link } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  MapPin, 
  ArrowLeft,
  Plus,
  ChefHat,
  DollarSign
} from 'lucide-react';
import { Card, CardBody, CardHeader, StarRating, Button, Input, Select } from '../components/ui';
import { restaurantApi, restaurantOwnersApi, recipeApi, cooksApi, authUtils } from '../services/api';
import { useState, useEffect } from 'react';

export function RestaurantDetailPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [restaurantRecipes, setRestaurantRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [showAddRecipeForm, setShowAddRecipeForm] = useState(false);
  const [showCreateRecipeForm, setShowCreateRecipeForm] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState('');
  const [recipePrice, setRecipePrice] = useState(0);
  const [addRecipeLoading, setAddRecipeLoading] = useState(false);
  const [addRecipeError, setAddRecipeError] = useState('');
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    servingSize: 2,
    typeOfDish: 'Main',
    calories: 0,
    description: '',
    timeToCook: 30,
    instructionSet: '',
  });
  const [createRecipeLoading, setCreateRecipeLoading] = useState(false);
  const [createRecipeError, setCreateRecipeError] = useState('');

  const user = authUtils.getUser();

  useEffect(() => {
    loadRestaurant();
    loadRestaurantRecipes();
    loadAllRecipes();
    checkOwnership();
  }, [id]);

  const loadRestaurant = async () => {
    try {
      setLoading(true);
      const data = await restaurantApi.getById(parseInt(id));
      setRestaurant(data);
      setError('');
    } catch (err) {
      setError('Restaurant not found');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadRestaurantRecipes = async () => {
    try {
      const cooksData = await cooksApi.getByRestaurant(parseInt(id));
      setRestaurantRecipes(cooksData);
    } catch (err) {
      console.error('Failed to load restaurant recipes:', err);
    }
  };

  const loadAllRecipes = async () => {
    try {
      const recipes = await recipeApi.getAll();
      setAllRecipes(recipes);
    } catch (err) {
      console.error('Failed to load recipes:', err);
    }
  };

  const checkOwnership = async () => {
    if (!user) return;
    try {
      const owned = await restaurantOwnersApi.getOwnedRestaurant(user.userID);
      // Check if this restaurant is owned by the user (id is nested: o.id.restaurantId)
      const ownsThis = owned && owned.some(o => o.id?.restaurantId === parseInt(id));
      setIsOwner(ownsThis);
    } catch (err) {
      console.error('Failed to check ownership:', err);
    }
  };

  const handleAddExistingRecipe = async (e) => {
    e.preventDefault();
    if (!selectedRecipeId) return;
    setAddRecipeLoading(true);
    setAddRecipeError('');
    try {
      await cooksApi.addRecipeToRestaurant(parseInt(id), parseInt(selectedRecipeId), recipePrice);
      setShowAddRecipeForm(false);
      setSelectedRecipeId('');
      setRecipePrice(0);
      loadRestaurantRecipes();
    } catch (err) {
      setAddRecipeError(err.response?.data || 'Failed to add recipe');
    } finally {
      setAddRecipeLoading(false);
    }
  };

  const handleCreateRecipe = async (e) => {
    e.preventDefault();
    setCreateRecipeLoading(true);
    setCreateRecipeError('');
    try {
      // Create recipe with restaurant as author
      const recipeData = {
        ...newRecipe,
        userAuthorId: null,
        restaurantAuthorId: parseInt(id),
      };
      await recipeApi.create(recipeData);
      
      // Reload recipes to get the new one
      const updatedRecipes = await recipeApi.getAll();
      setAllRecipes(updatedRecipes);
      
      // Find and link the newly created recipe
      const newRec = updatedRecipes.find(
        r => r.name === newRecipe.name && r.restaurantAuthorID === parseInt(id)
      );
      if (newRec) {
        await cooksApi.addRecipeToRestaurant(parseInt(id), newRec.recipeID, recipePrice);
      }
      
      setShowCreateRecipeForm(false);
      setNewRecipe({
        name: '',
        servingSize: 2,
        typeOfDish: 'Main',
        calories: 0,
        description: '',
        timeToCook: 30,
        instructionSet: '',
      });
      setRecipePrice(0);
      loadRestaurantRecipes();
    } catch (err) {
      const errData = err.response?.data;
      const errMsg = typeof errData === 'string' ? errData : errData?.message || JSON.stringify(errData) || 'Failed to create recipe';
      setCreateRecipeError(errMsg);
    } finally {
      setCreateRecipeLoading(false);
    }
  };

  // Get recipe details for display
  const getRecipeDetails = (recipeId) => {
    return allRecipes.find(r => r.recipeID === recipeId);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <UtensilsCrossed className="w-16 h-16 text-zinc-700 mx-auto mb-4 animate-pulse" />
        <p className="text-zinc-400">Loading restaurant...</p>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <UtensilsCrossed className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Restaurant Not Found</h2>
        <p className="text-zinc-400 mb-6">The restaurant you're looking for doesn't exist.</p>
        <Link to="/restaurants">
          <Button variant="primary">
            <ArrowLeft className="w-4 h-4" />
            Back to Restaurants
          </Button>
        </Link>
      </div>
    );
  }

  const recipeOptions = allRecipes
    .filter(r => !restaurantRecipes.some(rr => rr.recipeID === r.recipeID))
    .map(r => ({ value: r.recipeID.toString(), label: r.name }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link 
        to="/restaurants" 
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Restaurants
      </Link>

      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <Card hover={false}>
            <div className="aspect-[21/9] bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
              <UtensilsCrossed className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-zinc-700" />
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card hover={false}>
            <CardBody>
              <h1 className="text-3xl font-bold text-white mb-4">{restaurant.name}</h1>
              <div className="mb-4">
                <StarRating rating={restaurant.rating || 0} size="lg" />
              </div>
              <div className="flex items-start gap-2 text-zinc-400">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{restaurant.address}</span>
              </div>
            </CardBody>
          </Card>

          <Card hover={false}>
            <CardBody>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-400">
                  {(restaurant.rating || 0).toFixed(1)}
                </p>
                <p className="text-sm text-zinc-400">Rating</p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Restaurant Info */}
      <Card hover={false} className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-bold text-white">Restaurant Details</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-zinc-500 mb-1">Name</p>
              <p className="text-white font-medium">{restaurant.name}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500 mb-1">Rating</p>
              <p className="text-white font-medium">{(restaurant.rating || 0).toFixed(2)} / 5.00</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-zinc-500 mb-1">Address</p>
              <p className="text-white">{restaurant.address}</p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Restaurant Recipes Section */}
      <Card hover={false}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Menu Items</h2>
            {isOwner && (
              <div className="flex gap-2">
                <Button onClick={() => { setShowAddRecipeForm(!showAddRecipeForm); setShowCreateRecipeForm(false); }}>
                  <Plus className="w-4 h-4" />
                  Add Existing Recipe
                </Button>
                <Button onClick={() => { setShowCreateRecipeForm(!showCreateRecipeForm); setShowAddRecipeForm(false); }}>
                  <ChefHat className="w-4 h-4" />
                  Create New Recipe
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardBody>
          {/* Add Existing Recipe Form */}
          {showAddRecipeForm && isOwner && (
            <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Add Existing Recipe to Menu</h3>
              <form onSubmit={handleAddExistingRecipe} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  label="Select Recipe"
                  value={selectedRecipeId}
                  onChange={(e) => setSelectedRecipeId(e.target.value)}
                  options={[{ value: '', label: 'Select a recipe...' }, ...recipeOptions]}
                />
                <Input
                  label="Price ($)"
                  type="number"
                  step="0.01"
                  min="0"
                  value={recipePrice}
                  onChange={(e) => setRecipePrice(parseFloat(e.target.value))}
                />
                <div className="flex items-end gap-2">
                  <Button type="submit" disabled={addRecipeLoading || !selectedRecipeId}>
                    {addRecipeLoading ? 'Adding...' : 'Add to Menu'}
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => setShowAddRecipeForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
              {addRecipeError && (
                <p className="mt-2 text-sm text-red-400">{addRecipeError}</p>
              )}
            </div>
          )}

          {/* Create New Recipe Form */}
          {showCreateRecipeForm && isOwner && (
            <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Create New Restaurant Recipe</h3>
              <form onSubmit={handleCreateRecipe} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Recipe Name"
                  value={newRecipe.name}
                  onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
                  required
                  maxLength={20}
                />
                <Input
                  label="Type of Dish"
                  value={newRecipe.typeOfDish}
                  onChange={(e) => setNewRecipe({ ...newRecipe, typeOfDish: e.target.value })}
                  placeholder="Main, Appetizer, Dessert..."
                />
                <Input
                  label="Serving Size"
                  type="number"
                  value={newRecipe.servingSize}
                  onChange={(e) => setNewRecipe({ ...newRecipe, servingSize: parseInt(e.target.value) })}
                />
                <Input
                  label="Calories"
                  type="number"
                  value={newRecipe.calories}
                  onChange={(e) => setNewRecipe({ ...newRecipe, calories: parseInt(e.target.value) })}
                />
                <Input
                  label="Time to Cook (minutes)"
                  type="number"
                  value={newRecipe.timeToCook}
                  onChange={(e) => setNewRecipe({ ...newRecipe, timeToCook: parseInt(e.target.value) })}
                />
                <Input
                  label="Menu Price ($)"
                  type="number"
                  step="0.01"
                  min="0"
                  value={recipePrice}
                  onChange={(e) => setRecipePrice(parseFloat(e.target.value))}
                />
                <div className="md:col-span-2">
                  <Input
                    label="Description"
                    value={newRecipe.description}
                    onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
                    maxLength={200}
                  />
                </div>
                <div className="md:col-span-2">
                  <Input
                    label="Instructions"
                    value={newRecipe.instructionSet}
                    onChange={(e) => setNewRecipe({ ...newRecipe, instructionSet: e.target.value })}
                    maxLength={500}
                  />
                </div>
                {createRecipeError && (
                  <div className="md:col-span-2 text-red-400 text-sm">{createRecipeError}</div>
                )}
                <div className="md:col-span-2 flex gap-2">
                  <Button type="submit" disabled={createRecipeLoading}>
                    {createRecipeLoading ? 'Creating...' : 'Create Recipe'}
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => setShowCreateRecipeForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Restaurant Recipes List */}
          {restaurantRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {restaurantRecipes.map((item) => {
                const recipe = getRecipeDetails(item.recipeID);
                return (
                  <Link key={item.recipeID} to={`/recipes/${item.recipeID}`}>
                    <Card className="h-full group">
                      <CardBody>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                            {recipe?.name || `Recipe #${item.recipeID}`}
                          </h3>
                          <span className="flex items-center gap-1 text-green-400 font-medium">
                            <DollarSign className="w-4 h-4" />
                            {item.costOfItem?.toFixed(2) || '0.00'}
                          </span>
                        </div>
                        {recipe?.description && (
                          <p className="text-zinc-500 text-sm line-clamp-2">{recipe.description}</p>
                        )}
                      </CardBody>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <ChefHat className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-400">No menu items yet</p>
              {isOwner && (
                <p className="text-zinc-500 text-sm mt-1">Add recipes to your menu using the buttons above</p>
              )}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
