import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, MapPin, Filter, Plus } from 'lucide-react';
import { Card, CardBody, StarRating, SearchInput, Select, Button, Input } from '../components/ui';
import { restaurantApi } from '../services/api';

export function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({ name: '', rating: 0, address: '' });
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState('');

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      setLoading(true);
      const data = await restaurantApi.getAll();
      setRestaurants(data);
      setError('');
    } catch (err) {
      setError('Failed to load restaurants');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredRestaurants = useMemo(() => {
    let filtered = [...restaurants];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.name.toLowerCase().includes(query) ||
        r.address.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [restaurants, searchQuery, sortBy]);

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'name', label: 'Name' },
  ];

  const handleCreateRestaurant = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    setCreateError('');
    try {
      await restaurantApi.create(newRestaurant);
      setShowCreateForm(false);
      setNewRestaurant({ name: '', rating: 0, address: '' });
      loadRestaurants();
    } catch (err) {
      setCreateError(err.response?.data || 'Failed to create restaurant');
    } finally {
      setCreateLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <UtensilsCrossed className="w-16 h-16 text-zinc-700 mx-auto mb-4 animate-pulse" />
        <p className="text-zinc-400">Loading restaurants...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <UtensilsCrossed className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <p className="text-red-400">{error}</p>
        <Button onClick={loadRestaurants} className="mt-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Restaurants</h1>
          <p className="text-zinc-400">Discover {restaurants.length} amazing restaurants</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="w-4 h-4" />
          Add Restaurant
        </Button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <Card className="mb-8" hover={false}>
          <CardBody>
            <h3 className="text-lg font-semibold text-white mb-4">Add New Restaurant</h3>
            <form onSubmit={handleCreateRestaurant} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Name"
                value={newRestaurant.name}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
                required
                maxLength={50}
              />
              <Input
                label="Rating (0-5)"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={newRestaurant.rating}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, rating: parseFloat(e.target.value) })}
              />
              <Input
                label="Address"
                value={newRestaurant.address}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, address: e.target.value })}
                required
                maxLength={50}
              />
              {createError && (
                <div className="md:col-span-3 text-red-400 text-sm">{createError}</div>
              )}
              <div className="md:col-span-3 flex gap-2">
                <Button type="submit" disabled={createLoading}>
                  {createLoading ? 'Adding...' : 'Add Restaurant'}
                </Button>
                <Button type="button" variant="secondary" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {/* Filters */}
      <Card className="mb-8" hover={false}>
        <CardBody>
          <div className="flex items-center gap-2 mb-4 text-zinc-400">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filter & Search</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search restaurants..."
            />
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={sortOptions}
            />
          </div>
        </CardBody>
      </Card>

      {/* Results Count */}
      <div className="mb-6 text-zinc-400">
        Showing {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''}
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <Link key={restaurant.restID} to={`/restaurants/${restaurant.restID}`}>
            <Card className="h-full group">
              <div className="aspect-[16/9] bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
                <UtensilsCrossed className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-zinc-700 group-hover:text-amber-500/30 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <StarRating rating={restaurant.rating || 0} size="md" />
                </div>
              </div>
              <CardBody>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {restaurant.name}
                </h3>
                <div className="flex items-center gap-2 text-zinc-400">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm truncate">{restaurant.address}</span>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredRestaurants.length === 0 && (
        <div className="text-center py-16">
          <UtensilsCrossed className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No restaurants found</h3>
          <p className="text-zinc-400">Try adjusting your search query</p>
        </div>
      )}
    </div>
  );
}
