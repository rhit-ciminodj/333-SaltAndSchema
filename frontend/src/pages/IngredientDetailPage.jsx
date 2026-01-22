import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingBasket, 
  ArrowLeft,
  Store,
  MapPin,
  ArrowRightLeft,
  DollarSign,
  TrendingDown
} from 'lucide-react';
import { Card, CardBody, CardHeader, Badge, Button } from '../components/ui';
import { getIngredientWithPrices } from '../data/mockData';

export function IngredientDetailPage() {
  const { id } = useParams();
  const ingredient = getIngredientWithPrices(parseInt(id));

  if (!ingredient) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <ShoppingBasket className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Ingredient Not Found</h2>
        <p className="text-zinc-400 mb-6">The ingredient you're looking for doesn't exist.</p>
        <Link to="/ingredients">
          <Button variant="primary">
            <ArrowLeft className="w-4 h-4" />
            Back to Ingredients
          </Button>
        </Link>
      </div>
    );
  }

  const sortedPrices = [...ingredient.prices].sort((a, b) => a.price - b.price);
  const lowestPrice = sortedPrices[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link 
        to="/ingredients" 
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Ingredients
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="flex items-start gap-6">
            <div className="w-32 h-32 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl flex items-center justify-center flex-shrink-0">
              <ShoppingBasket className="w-16 h-16 text-zinc-700" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-3">{ingredient.name}</h1>
              <p className="text-zinc-400 text-lg">{ingredient.description}</p>
            </div>
          </div>

          {/* Store Prices */}
          <Card hover={false}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl font-semibold text-white">Where to Buy</h2>
                </div>
                <Badge variant="success">{ingredient.prices.length} stores</Badge>
              </div>
            </CardHeader>
            <CardBody>
              {sortedPrices.length > 0 ? (
                <div className="space-y-3">
                  {sortedPrices.map((store, index) => (
                    <Link 
                      key={store.storeID} 
                      to={`/stores/${store.storeID}`}
                      className={`
                        flex items-center justify-between p-4 rounded-xl transition-colors
                        ${index === 0 
                          ? 'bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20' 
                          : 'bg-zinc-800/50 hover:bg-zinc-800'
                        }
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`
                          w-12 h-12 rounded-lg flex items-center justify-center
                          ${index === 0 ? 'bg-emerald-500/20' : 'bg-zinc-700'}
                        `}>
                          <Store className={`w-6 h-6 ${index === 0 ? 'text-emerald-400' : 'text-zinc-500'}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-white">{store.name}</p>
                            {index === 0 && (
                              <Badge variant="success" className="text-xs">
                                <TrendingDown className="w-3 h-3 mr-1" />
                                Best Price
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-zinc-400">
                            <MapPin className="w-3 h-3" />
                            {store.address}
                          </div>
                        </div>
                      </div>
                      <div className={`text-xl font-bold ${index === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        ${store.price.toFixed(2)}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Store className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                  <p className="text-zinc-400">No stores currently sell this ingredient</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price Summary */}
          {lowestPrice && (
            <Card hover={false}>
              <CardBody>
                <h3 className="text-sm font-medium text-zinc-400 mb-2">Best Price</h3>
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-6 h-6 text-emerald-400" />
                  <span className="text-3xl font-bold text-emerald-400">
                    {lowestPrice.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-zinc-500">
                  at {lowestPrice.name}
                </p>
              </CardBody>
            </Card>
          )}

          {/* Substitutes */}
          {ingredient.substitutes && ingredient.substitutes.length > 0 && (
            <Card hover={false}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ArrowRightLeft className="w-5 h-5 text-blue-400" />
                  <h2 className="text-lg font-semibold text-white">Substitutes</h2>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <div className="space-y-2">
                  {ingredient.substitutes.map((sub) => (
                    <Link 
                      key={sub.ingredientsID} 
                      to={`/ingredients/${sub.ingredientsID}`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                    >
                      <div className="w-10 h-10 bg-zinc-700 rounded-lg flex items-center justify-center">
                        <ShoppingBasket className="w-5 h-5 text-zinc-500" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{sub.name}</p>
                        <p className="text-xs text-zinc-500">{sub.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
