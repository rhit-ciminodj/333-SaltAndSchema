import { useParams, Link } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  MapPin, 
  ArrowLeft
} from 'lucide-react';
import { Card, CardBody, CardHeader, StarRating, Button } from '../components/ui';
import { restaurantApi } from '../services/api';
import { useState, useEffect } from 'react';

export function RestaurantDetailPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadRestaurant();
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
      <Card hover={false}>
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
    </div>
  );
}
