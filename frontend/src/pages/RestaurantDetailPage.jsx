import { useParams, Link } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  MapPin, 
  ArrowLeft,
  ChefHat,
  Clock,
  Flame
} from 'lucide-react';
import { Card, CardBody, CardHeader, Badge, StarRating, Button } from '../components/ui';
import { getRestaurantWithMenu } from '../data/mockData';

export function RestaurantDetailPage() {
  const { id } = useParams();
  const restaurant = getRestaurantWithMenu(parseInt(id));

  if (!restaurant) {
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
                <StarRating rating={restaurant.rating} size="lg" />
              </div>
              <div className="flex items-start gap-2 text-zinc-400">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{restaurant.address}</span>
              </div>
            </CardBody>
          </Card>

          <Card hover={false}>
            <CardBody>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-amber-400">{restaurant.menu.length}</p>
                  <p className="text-sm text-zinc-400">Menu Items</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-400">
                    {restaurant.rating.toFixed(1)}
                  </p>
                  <p className="text-sm text-zinc-400">Rating</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Menu */}
      <Card hover={false}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Menu</h2>
            <Badge variant="primary">{restaurant.menu.length} items</Badge>
          </div>
        </CardHeader>
        <CardBody>
          {restaurant.menu.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {restaurant.menu.map((item) => (
                <Link 
                  key={item.recipeID} 
                  to={`/recipes/${item.recipeID}`}
                  className="flex gap-4 p-4 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors group"
                >
                  <div className="w-20 h-20 bg-zinc-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ChefHat className="w-10 h-10 text-zinc-600 group-hover:text-amber-500/50 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-amber-400 font-bold flex-shrink-0">
                        ${item.costOfItem.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-zinc-500 text-sm mb-2 line-clamp-2">{item.description}</p>
                    <div className="flex items-center gap-3 text-xs text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.timeToCook}m
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        {item.calories} cal
                      </span>
                      <Badge variant="default" className="text-xs">{item.typeOfDish}</Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ChefHat className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-400">No menu items available</p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
