import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBasket, Filter, DollarSign } from 'lucide-react';
import { Card, CardBody, Badge, SearchInput } from '../components/ui';
import { ingredients, getIngredientWithPrices } from '../data/mockData';

export function IngredientsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const ingredientsWithPrices = useMemo(() => 
    ingredients.map(i => getIngredientWithPrices(i.ingredientsID)),
    []
  );

  const filteredIngredients = useMemo(() => {
    let filtered = ingredientsWithPrices;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(i => 
        i.name.toLowerCase().includes(query) ||
        i.description?.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [ingredientsWithPrices, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Ingredients</h1>
        <p className="text-zinc-400">Browse {ingredients.length} ingredients and find the best prices</p>
      </div>

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
        {filteredIngredients.map((ingredient) => {
          const lowestPrice = ingredient.prices.length > 0 
            ? Math.min(...ingredient.prices.map(p => p.price))
            : null;
          const highestPrice = ingredient.prices.length > 0 
            ? Math.max(...ingredient.prices.map(p => p.price))
            : null;

          return (
            <Link key={ingredient.ingredientsID} to={`/ingredients/${ingredient.ingredientsID}`}>
              <Card className="h-full group">
                <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
                  <ShoppingBasket className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-zinc-700 group-hover:text-emerald-500/30 transition-colors" />
                  {ingredient.prices.length > 0 && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="success">
                        {ingredient.prices.length} store{ingredient.prices.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                  )}
                </div>
                <CardBody>
                  <h3 className="font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {ingredient.name}
                  </h3>
                  <p className="text-zinc-500 text-sm mb-3 line-clamp-2">
                    {ingredient.description}
                  </p>
                  {lowestPrice !== null && (
                    <div className="flex items-center gap-1 text-emerald-400">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-semibold">
                        {lowestPrice === highestPrice 
                          ? `$${lowestPrice.toFixed(2)}`
                          : `$${lowestPrice.toFixed(2)} - $${highestPrice.toFixed(2)}`
                        }
                      </span>
                    </div>
                  )}
                  {ingredient.substitutes && ingredient.substitutes.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs text-zinc-500">
                        {ingredient.substitutes.length} substitute{ingredient.substitutes.length !== 1 ? 's' : ''} available
                      </span>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Link>
          );
        })}
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
