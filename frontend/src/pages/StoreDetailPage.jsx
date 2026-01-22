import { useParams, Link } from 'react-router-dom';
import { 
  Store, 
  MapPin, 
  ArrowLeft,
  ShoppingBasket,
  DollarSign
} from 'lucide-react';
import { Card, CardBody, CardHeader, Badge, Button } from '../components/ui';
import { getStoreWithInventory } from '../data/mockData';

export function StoreDetailPage() {
  const { id } = useParams();
  const store = getStoreWithInventory(parseInt(id));

  if (!store) {
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

  const sortedInventory = [...store.inventory].sort((a, b) => a.name.localeCompare(b.name));

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

          <Card hover={false}>
            <CardBody>
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-400">{store.inventory.length}</p>
                <p className="text-sm text-zinc-400">Items Available</p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Inventory */}
      <Card hover={false}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBasket className="w-5 h-5 text-emerald-400" />
              <h2 className="text-2xl font-bold text-white">Available Ingredients</h2>
            </div>
            <Badge variant="success">{store.inventory.length} items</Badge>
          </div>
        </CardHeader>
        <CardBody>
          {sortedInventory.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedInventory.map((item) => (
                <Link 
                  key={item.ingredientsID} 
                  to={`/ingredients/${item.ingredientsID}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors group"
                >
                  <div className="w-14 h-14 bg-zinc-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShoppingBasket className="w-7 h-7 text-zinc-500 group-hover:text-emerald-500/50 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white group-hover:text-amber-400 transition-colors truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-zinc-500 truncate">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400 font-bold flex-shrink-0">
                    <DollarSign className="w-4 h-4" />
                    {item.price.toFixed(2)}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingBasket className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-400">No inventory data available</p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
