import { useParams, Link } from 'react-router-dom';
import { 
  Store, 
  MapPin, 
  ArrowLeft,
  Plus,
  Package,
  DollarSign
} from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Input, Select } from '../components/ui';
import { storeApi, groceryStoreOwnersApi, ingredientApi, soldByApi, authUtils } from '../services/api';
import { useState, useEffect } from 'react';

export function StoreDetailPage() {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [storeIngredients, setStoreIngredients] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [showAddIngredientForm, setShowAddIngredientForm] = useState(false);
  const [selectedIngredientId, setSelectedIngredientId] = useState('');
  const [ingredientPrice, setIngredientPrice] = useState(0);
  const [addIngredientLoading, setAddIngredientLoading] = useState(false);
  const [addIngredientError, setAddIngredientError] = useState('');

  const user = authUtils.getUser();

  useEffect(() => {
    loadStore();
    loadStoreIngredients();
    loadAllIngredients();
    checkOwnership();
  }, [id]);

  const loadStore = async () => {
    try {
      setLoading(true);
      const data = await storeApi.getById(parseInt(id));
      setStore(data);
      setError('');
    } catch (err) {
      setError('Store not found');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadStoreIngredients = async () => {
    try {
      const soldData = await soldByApi.getByStore(parseInt(id));
      setStoreIngredients(soldData);
    } catch (err) {
      console.error('Failed to load store ingredients:', err);
    }
  };

  const loadAllIngredients = async () => {
    try {
      const ingredients = await ingredientApi.getAll();
      setAllIngredients(ingredients);
    } catch (err) {
      console.error('Failed to load ingredients:', err);
    }
  };

  const checkOwnership = async () => {
    if (!user) return;
    try {
      const owned = await groceryStoreOwnersApi.getOwnedStore(user.userID);
      // Check if this store is owned by the user (id is nested: o.id.storeId)
      const ownsThis = owned && owned.some(o => o.id?.storeId === parseInt(id));
      setIsOwner(ownsThis);
    } catch (err) {
      console.error('Failed to check ownership:', err);
    }
  };

  const handleAddIngredient = async (e) => {
    e.preventDefault();
    if (!selectedIngredientId) return;
    setAddIngredientLoading(true);
    setAddIngredientError('');
    try {
      await soldByApi.addIngredientToStore(parseInt(selectedIngredientId), parseInt(id), ingredientPrice);
      setShowAddIngredientForm(false);
      setSelectedIngredientId('');
      setIngredientPrice(0);
      loadStoreIngredients();
    } catch (err) {
      setAddIngredientError(err.response?.data || 'Failed to add ingredient');
    } finally {
      setAddIngredientLoading(false);
    }
  };

  // Get ingredient details for display
  const getIngredientDetails = (ingredientId) => {
    return allIngredients.find(i => i.ingredientsID === ingredientId);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <Store className="w-16 h-16 text-zinc-700 mx-auto mb-4 animate-pulse" />
        <p className="text-zinc-400">Loading store...</p>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <Store className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Store Not Found</h2>
        <p className="text-zinc-400 mb-6">The store you're looking for doesn't exist.</p>
        <Link to="/stores">
          <Button variant="primary">
            <ArrowLeft className="w-4 h-4" />
            Back to Stores
          </Button>
        </Link>
      </div>
    );
  }

  const ingredientOptions = allIngredients
    .filter(i => !storeIngredients.some(si => si.ingredientID === i.ingredientsID))
    .map(i => ({ value: i.ingredientsID.toString(), label: i.name }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link 
        to="/stores" 
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Stores
      </Link>

      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card hover={false}>
            <div className="aspect-[21/9] bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
              <Store className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-zinc-700" />
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card hover={false}>
            <CardBody>
              <h1 className="text-3xl font-bold text-white mb-4">{store.name}</h1>
              <div className="flex items-start gap-2 text-zinc-400">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{store.address}</span>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Store Info */}
      <Card hover={false} className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-bold text-white">Store Details</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-zinc-500 mb-1">Name</p>
              <p className="text-white font-medium">{store.name}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500 mb-1">Store ID</p>
              <p className="text-white font-medium">{store.storeID}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-zinc-500 mb-1">Address</p>
              <p className="text-white">{store.address}</p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Ingredients Sold Section */}
      <Card hover={false}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Ingredients Sold</h2>
            {isOwner && (
              <Button onClick={() => setShowAddIngredientForm(!showAddIngredientForm)}>
                <Plus className="w-4 h-4" />
                Add Ingredient
              </Button>
            )}
          </div>
        </CardHeader>
        <CardBody>
          {/* Add Ingredient Form */}
          {showAddIngredientForm && isOwner && (
            <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Add Ingredient to Store</h3>
              <form onSubmit={handleAddIngredient} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  label="Select Ingredient"
                  value={selectedIngredientId}
                  onChange={(e) => setSelectedIngredientId(e.target.value)}
                  options={[{ value: '', label: 'Select an ingredient...' }, ...ingredientOptions]}
                />
                <Input
                  label="Price ($)"
                  type="number"
                  step="0.01"
                  min="0"
                  value={ingredientPrice}
                  onChange={(e) => setIngredientPrice(parseFloat(e.target.value))}
                />
                <div className="flex items-end gap-2">
                  <Button type="submit" disabled={addIngredientLoading || !selectedIngredientId}>
                    {addIngredientLoading ? 'Adding...' : 'Add Ingredient'}
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => setShowAddIngredientForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
              {addIngredientError && (
                <p className="mt-2 text-sm text-red-400">{addIngredientError}</p>
              )}
            </div>
          )}

          {/* Ingredients List */}
          {storeIngredients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {storeIngredients.map((item, index) => {
                const ingredient = getIngredientDetails(item.ingredientID);
                return (
                  <Link key={`${item.ingredientID}-${index}`} to={`/ingredients/${item.ingredientID}`}>
                    <Card className="h-full group">
                      <CardBody>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Package className="w-5 h-5 text-zinc-500" />
                            <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                              {ingredient?.name || `Ingredient #${item.ingredientID}`}
                            </h3>
                          </div>
                          <span className="flex items-center gap-1 text-green-400 font-medium">
                            <DollarSign className="w-4 h-4" />
                            {parseFloat(item.price)?.toFixed(2) || '0.00'}
                          </span>
                        </div>
                        {ingredient?.description && (
                          <p className="text-zinc-500 text-sm line-clamp-2">{ingredient.description}</p>
                        )}
                      </CardBody>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-400">No ingredients listed yet</p>
              {isOwner && (
                <p className="text-zinc-500 text-sm mt-1">Add ingredients your store sells using the button above</p>
              )}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
