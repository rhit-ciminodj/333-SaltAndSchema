import { useParams, Link } from 'react-router-dom';
import { 
  Store, 
  MapPin, 
  ArrowLeft
} from 'lucide-react';
import { Card, CardBody, CardHeader, Button } from '../components/ui';
import { storeApi } from '../services/api';
import { useState, useEffect } from 'react';

export function StoreDetailPage() {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStore();
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
      <Card hover={false}>
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
    </div>
  );
}
