import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Clock, Flame, Users, Filter, Plus, Sparkles, Star } from 'lucide-react';
import { Card, CardBody, Badge, StarRating, SearchInput, Select, Button, Input } from '../components/ui';
import { recipeApi, cuisineApi, typeOfApi, authUtils } from '../services/api';

export function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    servingSize: 2,
    typeOfDish: 'Main',
    calories: 0,
    description: '',
    timeToCook: 30,
    instructionSet: '',
  });
  const [pantryInput, setPantryInput] = useState('');
  const [matchResults, setMatchResults] = useState([]);
  const [matchLoading, setMatchLoading] = useState(false);
  const [matchError, setMatchError] = useState('');
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState('');
  const [cuisines, setCuisines] = useState([]);
  const [recipeCuisines, setRecipeCuisines] = useState({});
  const [recipeRatings, setRecipeRatings] = useState({});

  useEffect(() => {
    loadRecipes();
    loadCuisines();
  }, []);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      const data = await recipeApi.getAll();
      setRecipes(data);
      setError('');
      
      // Load ratings for all recipes
      const ratings = {};
      for (const recipe of data) {
        try {
          const stars = await recipeApi.getStars(recipe.recipeID);
          ratings[recipe.recipeID] = stars || 0;
        } catch {
          ratings[recipe.recipeID] = 0;
        }
      }
      setRecipeRatings(ratings);
      
      // Load cuisines for all recipes
      const cuisinesMap = {};
      for (const recipe of data) {
        try {
          const typesOf = await typeOfApi.getByRecipe(recipe.recipeID);
          cuisinesMap[recipe.recipeID] = typesOf.map(t => t.cuisineID);
        } catch {
          cuisinesMap[recipe.recipeID] = [];
        }
      }
      setRecipeCuisines(cuisinesMap);
    } catch (err) {
      setError('Failed to load recipes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadCuisines = async () => {
    try {
      const data = await cuisineApi.getAll();
      setCuisines(data);
    } catch (err) {
      console.error('Failed to load cuisines:', err);
    }
  };

  const dishTypes = ['all', ...new Set(recipes.map(r => r.typeOfDish).filter(Boolean))];

  const filteredRecipes = useMemo(() => {
    let filtered = [...recipes];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.name.toLowerCase().includes(query) ||
        r.description?.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(r => r.typeOfDish === selectedType);
    }

    // Cuisine filter
    if (selectedCuisine !== 'all') {
      const cuisineId = parseInt(selectedCuisine);
      filtered = filtered.filter(r => 
        recipeCuisines[r.recipeID]?.includes(cuisineId)
      );
    }

    // Sort
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'time':
        filtered.sort((a, b) => (a.timeToCook || 0) - (b.timeToCook || 0));
        break;
      case 'time-desc':
        filtered.sort((a, b) => (b.timeToCook || 0) - (a.timeToCook || 0));
        break;
      case 'calories':
        filtered.sort((a, b) => (a.calories || 0) - (b.calories || 0));
        break;
      case 'calories-desc':
        filtered.sort((a, b) => (b.calories || 0) - (a.calories || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (recipeRatings[b.recipeID] || 0) - (recipeRatings[a.recipeID] || 0));
        break;
      case 'rating-asc':
        filtered.sort((a, b) => (recipeRatings[a.recipeID] || 0) - (recipeRatings[b.recipeID] || 0));
        break;
    }

    return filtered;
  }, [recipes, searchQuery, selectedType, selectedCuisine, sortBy, recipeCuisines, recipeRatings]);

  const typeOptions = dishTypes.map(type => ({
    value: type,
    label: type === 'all' ? 'All Types' : type
  }));

  const cuisineOptions = [
    { value: 'all', label: 'All Cuisines' },
    ...cuisines.map(c => ({ value: c.cuisineID.toString(), label: c.name }))
  ];

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'rating-asc', label: 'Lowest Rated' },
    { value: 'time', label: 'Quickest' },
    { value: 'time-desc', label: 'Longest' },
    { value: 'calories', label: 'Lowest Calories' },
    { value: 'calories-desc', label: 'Highest Calories' },
  ];

  const handleCreateRecipe = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    setCreateError('');
    try {
      const user = authUtils.getUser();
      const recipeData = {
        ...newRecipe,
        userAuthorId: user?.userID || null,
        restaurantAuthorId: null,
      };
      await recipeApi.create(recipeData);
      setShowCreateForm(false);
      setNewRecipe({
        name: '',
        servingSize: 2,
        typeOfDish: 'Main',
        calories: 0,
        description: '',
        timeToCook: 30,
        instructionSet: '',
      });
      loadRecipes();
    } catch (err) {
      const errData = err.response?.data;
      const errMsg = typeof errData === 'string' ? errData : errData?.message || JSON.stringify(errData) || 'Failed to create recipe';
      setCreateError(errMsg);
    } finally {
      setCreateLoading(false);
    }
  };

  const parseIngredientNames = (value) => value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  const handleMatchRecipes = async (e) => {
    e.preventDefault();
    const ingredients = parseIngredientNames(pantryInput);
    if (ingredients.length === 0) {
      setMatchResults([]);
      setMatchError('Enter at least one ingredient.');
      return;
    }

    setMatchLoading(true);
    setMatchError('');
    try {
      const results = await recipeApi.matchByIngredients(ingredients);
      setMatchResults(results);
    } catch (err) {
      setMatchError('Failed to match recipes');
      console.error(err);
    } finally {
      setMatchLoading(false);
    }
  };

  const handleClearMatch = () => {
    setPantryInput('');
    setMatchResults([]);
    setMatchError('');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <ChefHat className="w-16 h-16 text-zinc-700 mx-auto mb-4 animate-pulse" />
        <p className="text-zinc-400">Loading recipes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <ChefHat className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <p className="text-red-400">{error}</p>
        <Button onClick={loadRecipes} className="mt-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Recipes</h1>
          <p className="text-zinc-400">Explore our collection of {recipes.length} delicious recipes</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="w-4 h-4" />
          Add Recipe
        </Button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <Card className="mb-8" hover={false}>
          <CardBody>
            {authUtils.getUser() ? (
              <>
                <h3 className="text-lg font-semibold text-white mb-4">Create New Recipe</h3>
                <form onSubmit={handleCreateRecipe} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Name"
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
              {createError && (
                <div className="md:col-span-2 text-red-400 text-sm">{createError}</div>
              )}
              <div className="md:col-span-2 flex gap-2">
                <Button type="submit" disabled={createLoading}>
                  {createLoading ? 'Creating...' : 'Create Recipe'}
                </Button>
                <Button type="button" variant="secondary" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-zinc-400 mb-3">Log in to create a recipe</p>
                <Link to="/login">
                  <Button variant="primary">Log In</Button>
                </Link>
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {/* Filters */}
      <Card className="mb-8" hover={false}>
        <CardBody>
          <div className="flex items-center gap-2 mb-4 text-zinc-400">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filter & Sort</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes..."
            />
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              options={typeOptions}
            />
            <Select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              options={cuisineOptions}
            />
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={sortOptions}
            />
          </div>
        </CardBody>
      </Card>

      {/* Pantry Match */}
      <Card className="mb-8" hover={false}>
        <CardBody>
          <div className="flex items-center gap-2 mb-4 text-zinc-400">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Pantry Match</span>
          </div>
          <form onSubmit={handleMatchRecipes} className="flex flex-col sm:flex-row gap-3">
            <Input
              label="Your ingredients"
              value={pantryInput}
              onChange={(e) => setPantryInput(e.target.value)}
              placeholder="tomato, basil, garlic"
              className="flex-1"
            />
            <div className="flex gap-2 sm:items-end">
              <Button type="submit" disabled={matchLoading}>
                {matchLoading ? 'Matching...' : 'Find Matches'}
              </Button>
              <Button type="button" variant="secondary" onClick={handleClearMatch}>
                Clear
              </Button>
            </div>
          </form>
          {matchError && (
            <p className="mt-2 text-sm text-red-400">{matchError}</p>
          )}
        </CardBody>
      </Card>

      {matchResults.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Pantry Match Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {matchResults.map((recipe) => (
              <Link key={`match-${recipe.recipeID}`} to={`/recipes/${recipe.recipeID}`}>
                <Card className="h-full group">
                  <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      {recipe.typeOfDish && <Badge variant="primary">{recipe.typeOfDish}</Badge>}
                      <Badge variant="success">{Math.round(recipe.matchPercent)}% match</Badge>
                    </div>
                    <ChefHat className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-zinc-700 group-hover:text-amber-500/30 transition-colors" />
                  </div>
                  <CardBody>
                    <h3 className="font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {recipe.name}
                    </h3>
                    <p className="text-zinc-500 text-sm mb-3 line-clamp-2">
                      {recipe.description}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-zinc-400 mb-3">
                      <span>{recipe.matchedCount} of {recipe.totalCount} ingredients</span>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {!matchLoading && pantryInput.trim() && matchResults.length === 0 && !matchError && (
        <div className="mb-10 text-zinc-400">
          No matches yet. Try adding more ingredients.
        </div>
      )}

      {/* Results Count */}
      <div className="mb-6 text-zinc-400">
        Showing {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => (
          <Link key={recipe.recipeID} to={`/recipes/${recipe.recipeID}`}>
            <Card className="h-full group">
              <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  {recipe.typeOfDish && <Badge variant="primary">{recipe.typeOfDish}</Badge>}
                  {recipeRatings[recipe.recipeID] > 0 && (
                    <span className="flex items-center gap-1 text-amber-400 text-sm font-medium bg-black/40 px-2 py-0.5 rounded">
                      <Star className="w-3 h-3 fill-current" />
                      {recipeRatings[recipe.recipeID].toFixed(1)}
                    </span>
                  )}
                </div>
                <ChefHat className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-zinc-700 group-hover:text-amber-500/30 transition-colors" />
              </div>
              <CardBody>
                <h3 className="font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {recipe.name}
                </h3>
                <p className="text-zinc-500 text-sm mb-3 line-clamp-2">
                  {recipe.description}
                </p>
                <div className="flex items-center gap-3 text-sm text-zinc-400 mb-3">
                  {recipe.timeToCook && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {recipe.timeToCook}m
                    </span>
                  )}
                  {recipe.calories && (
                    <span className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      {recipe.calories}
                    </span>
                  )}
                  {recipe.servingSize && (
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {recipe.servingSize}
                    </span>
                  )}
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-16">
          <ChefHat className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No recipes found</h3>
          <p className="text-zinc-400">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}
