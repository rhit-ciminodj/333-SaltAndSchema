import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingBasket, 
  ArrowLeft,
  Store
} from 'lucide-react';
import { Card, CardBody, CardHeader, Button } from '../components/ui';
import { ingredientApi } from '../services/api';
import { useState, useEffect } from 'react';

export function IngredientDetailPage() {
  const { id } = useParams();
  const [ingredient, setIngredient] = useState(null);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadIngredient();
  }, [id]);

  const loadIngredient = async () => {
    try {
      setLoading(true);
      const [data, storeData] = await Promise.all([
        ingredientApi.getById(parseInt(id)),
        ingredientApi.getStores(parseInt(id)).catch(() => [])
      ]);
      setIngredient(data);
      setStores(storeData);
      setError('');
    } catch (err) {
      setError('Ingredient not found');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <ShoppingBasket className="w-16 h-16 text-zinc-700 mx-auto mb-4 animate-pulse" />
        <p className="text-zinc-400">Loading ingredient...</p>
      </div>
    );
  }

  if (error || !ingredient) {
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

          {/* Info Card */}
          <Card hover={false}>
            <CardHeader>
              <h2 className="text-xl font-semibold text-white">Ingredient Details</h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-zinc-500">Name</p>
                  <p className="text-white font-medium">{ingredient.name}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">ID</p>
                  <p className="text-white font-medium">{ingredient.ingredientsID}</p>
                </div>
                {ingredient.description && (
                  <div className="col-span-2">
                    <p className="text-sm text-zinc-500">Description</p>
                    <p className="text-white">{ingredient.description}</p>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card hover={false}>
            <CardHeader>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Store className="w-5 h-5 text-emerald-400" />
                Where to Buy
              </h3>
            </CardHeader>
            <CardBody>
              {stores.length > 0 ? (
                <ul className="space-y-2">
                  {stores.map((storeName, index) => (
                    <li key={index} className="flex items-center gap-2 text-zinc-300">
                      <Store className="w-4 h-4 text-zinc-500" />
                      {storeName}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-zinc-500 text-sm">No stores have this ingredient listed.</p>
              )}
            </CardBody>
          </Card>

          <Card hover={false}>
            <CardBody className="text-center">
              <ShoppingBasket className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white">{ingredient.name}</h3>
              <p className="text-sm text-zinc-400 mt-2">
                ID: {ingredient.ingredientsID}
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
