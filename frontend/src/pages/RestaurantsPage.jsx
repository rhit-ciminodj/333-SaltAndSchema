import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, MapPin, Filter } from 'lucide-react';
import { Card, CardBody, StarRating, SearchInput, Select } from '../components/ui';
import { restaurants, getRestaurantWithMenu } from '../data/mockData';

export function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const restaurantsWithMenu = useMemo(() => 
    restaurants.map(r => getRestaurantWithMenu(r.restID)),
    []
  );

  const filteredRestaurants = useMemo(() => {
    let filtered = restaurantsWithMenu;

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
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'menu':
        filtered.sort((a, b) => b.menu.length - a.menu.length);
        break;
    }

    return filtered;
  }, [restaurantsWithMenu, searchQuery, sortBy]);

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'name', label: 'Name' },
    { value: 'menu', label: 'Most Menu Items' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Restaurants</h1>
        <p className="text-zinc-400">Discover {restaurants.length} amazing restaurants in your area</p>
      </div>

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
                  <StarRating rating={restaurant.rating} size="md" />
                </div>
              </div>
              <CardBody>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {restaurant.name}
                </h3>
                <div className="flex items-center gap-2 text-zinc-400 mb-4">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm truncate">{restaurant.address}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">
                    {restaurant.menu.length} menu item{restaurant.menu.length !== 1 ? 's' : ''}
                  </span>
                  {restaurant.menu.length > 0 && (
                    <span className="text-amber-400">
                      ${Math.min(...restaurant.menu.map(m => m.costOfItem)).toFixed(2)} - ${Math.max(...restaurant.menu.map(m => m.costOfItem)).toFixed(2)}
                    </span>
                  )}
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
