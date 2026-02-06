import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBasket, Filter, Plus } from 'lucide-react';
import { Card, CardBody, SearchInput, Button, Input } from '../components/ui';
import { ingredientApi } from '../services/api';

export function IngredientsPage() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newIngredient, setNewIngredient] = useState({ name: '', description: '' });
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState('');

  useEffect(() => {
    loadIngredients();
  }, []);

  const loadIngredients = async () => {
    try {
      setLoading(true);
      const data = await ingredientApi.getAll();
      setIngredients(data);
      setError('');
    } catch (err) {
      setError('Failed to load ingredients');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredIngredients = useMemo(() => {
    let filtered = [...ingredients];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(i => 
        i.name.toLowerCase().includes(query) ||
        i.description?.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [ingredients, searchQuery]);

  const handleCreateIngredient = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    setCreateError('');
    try {
      await ingredientApi.create(newIngredient);
      setShowCreateForm(false);
      setNewIngredient({ name: '', description: '' });
      loadIngredients();
    } catch (err) {
      const errData = err.response?.data;
      const errMsg = typeof errData === 'string' ? errData : errData?.message || JSON.stringify(errData) || 'Failed to create ingredient';
      setCreateError(errMsg);
    } finally {
      setCreateLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <ShoppingBasket className="w-16 h-16 text-zinc-700 mx-auto mb-4 animate-pulse" />
        <p className="text-zinc-400">Loading ingredients...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <ShoppingBasket className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <p className="text-red-400">{error}</p>
        <Button onClick={loadIngredients} className="mt-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Ingredients</h1>
          <p className="text-zinc-400">Browse {ingredients.length} ingredients</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="w-4 h-4" />
          Add Ingredient
        </Button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <Card className="mb-8" hover={false}>
          <CardBody>
            <h3 className="text-lg font-semibold text-white mb-4">Add New Ingredient</h3>
            <form onSubmit={handleCreateIngredient} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Name"
                value={newIngredient.name}
                onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                required
                maxLength={20}
              />
              <Input
                label="Description"
                value={newIngredient.description}
                onChange={(e) => setNewIngredient({ ...newIngredient, description: e.target.value })}
                maxLength={200}
              />
              {createError && (
                <div className="md:col-span-2 text-red-400 text-sm">{createError}</div>
              )}
              <div className="md:col-span-2 flex gap-2">
                <Button type="submit" disabled={createLoading}>
                  {createLoading ? 'Adding...' : 'Add Ingredient'}
                </Button>
                <Button type="button" variant="secondary" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {/* Search */}
      <Card className="mb-8" hover={false}>
        <CardBody>
          <div className="flex items-center gap-2 mb-4 text-zinc-400">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Search</span>
          </div>
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ingredients..."
            className="max-w-md"
          />
        </CardBody>
      </Card>

      {/* Results Count */}
      <div className="mb-6 text-zinc-400">
        Showing {filteredIngredients.length} ingredient{filteredIngredients.length !== 1 ? 's' : ''}
      </div>

      {/* Ingredients Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredIngredients.map((ingredient) => (
          <Link key={ingredient.ingredientsID} to={`/ingredients/${ingredient.ingredientsID}`}>
            <Card className="h-full group">
              <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
                <ShoppingBasket className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-zinc-700 group-hover:text-emerald-500/30 transition-colors" />
              </div>
              <CardBody>
                <h3 className="font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {ingredient.name}
                </h3>
                <p className="text-zinc-500 text-sm mb-3 line-clamp-2">
                  {ingredient.description}
                </p>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredIngredients.length === 0 && (
        <div className="text-center py-16">
          <ShoppingBasket className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No ingredients found</h3>
          <p className="text-zinc-400">Try adjusting your search query</p>
        </div>
      )}
    </div>
  );
}
