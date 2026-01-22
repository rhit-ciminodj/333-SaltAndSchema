import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  Flame, 
  Users, 
  ChefHat, 
  ArrowLeft,
  Heart,
  Share2,
  Utensils,
  ShoppingBasket,
  BookOpen
} from 'lucide-react';
import { Card, CardBody, CardHeader, Badge, StarRating, InteractiveStarRating, Button } from '../components/ui';
import { getRecipeWithDetails, restaurants, cooks } from '../data/mockData';
import { useState } from 'react';

export function RecipeDetailPage() {
  const { id } = useParams();
  const recipe = getRecipeWithDetails(parseInt(id));
  const [userRating, setUserRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!recipe) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <ChefHat className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Recipe Not Found</h2>
        <p className="text-zinc-400 mb-6">The recipe you're looking for doesn't exist.</p>
        <Link to="/recipes">
          <Button variant="primary">
            <ArrowLeft className="w-4 h-4" />
            Back to Recipes
          </Button>
        </Link>
      </div>
    );
  }

  // Find restaurants serving this recipe
  const servingRestaurants = cooks
    .filter(c => c.recipeID === recipe.recipeID)
    .map(c => ({
      ...restaurants.find(r => r.restID === c.restaurantID),
      price: c.costOfItem
    }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link 
        to="/recipes" 
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Recipes
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {recipe.cuisines?.map(cuisine => (
                <Badge key={cuisine.cuisineID} variant="primary">{cuisine.name}</Badge>
              ))}
              <Badge variant="info">{recipe.typeOfDish}</Badge>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{recipe.name}</h1>
            <p className="text-zinc-400 text-lg mb-6">{recipe.description}</p>
            
            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-zinc-400">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>{recipe.timeToCook} minutes</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Flame className="w-5 h-5 text-orange-400" />
                <span>{recipe.calories} calories</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Users className="w-5 h-5 text-blue-400" />
                <span>Serves {recipe.servingSize}</span>
              </div>
              {recipe.author && (
                <div className="flex items-center gap-2 text-zinc-400">
                  <ChefHat className="w-5 h-5 text-emerald-400" />
                  <span>By {recipe.author.username}</span>
                </div>
              )}
            </div>
          </div>

          {/* Recipe Image Placeholder */}
          <Card hover={false}>
            <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
              <ChefHat className="w-24 h-24 text-zinc-700" />
            </div>
          </Card>

          {/* Instructions */}
          <Card hover={false}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h2 className="text-xl font-semibold text-white">Instructions</h2>
              </div>
            </CardHeader>
            <CardBody>
              <div className="prose prose-invert max-w-none">
                {recipe.instructionSet?.split(/\d+\.\s+/).filter(Boolean).map((step, index) => (
                  <div key={index} className="flex gap-4 mb-4 last:mb-0">
                    <div className="flex-shrink-0 w-8 h-8 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-zinc-300 pt-1">{step.trim()}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Pair With */}
          {recipe.pairings && recipe.pairings.length > 0 && (
            <Card hover={false}>
              <CardHeader>
                <h2 className="text-xl font-semibold text-white">Best Paired With</h2>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recipe.pairings.map(pairing => (
                    <Link key={pairing.recipeID} to={`/recipes/${pairing.recipeID}`}>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                        <div className="w-12 h-12 bg-zinc-700 rounded-lg flex items-center justify-center">
                          <ChefHat className="w-6 h-6 text-zinc-500" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{pairing.name}</p>
                          <p className="text-sm text-zinc-400">{pairing.typeOfDish}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card hover={false}>
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                {recipe.avgRating > 0 ? (
                  <StarRating rating={recipe.avgRating} size="lg" />
                ) : (
                  <span className="text-zinc-400">No ratings yet</span>
                )}
                <span className="text-sm text-zinc-500">{recipe.numReviews} reviews</span>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant={isFavorite ? 'primary' : 'secondary'} 
                  className="flex-1"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Favorited' : 'Favorite'}
                </Button>
                <Button variant="secondary">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Rate This Recipe */}
          <Card hover={false}>
            <CardBody>
              <h3 className="font-semibold text-white mb-3">Rate This Recipe</h3>
              <InteractiveStarRating rating={userRating} onRate={setUserRating} />
              {userRating > 0 && (
                <p className="text-sm text-zinc-400 mt-2">
                  You rated this {userRating} star{userRating !== 1 ? 's' : ''}
                </p>
              )}
            </CardBody>
          </Card>

          {/* Ingredients */}
          <Card hover={false}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShoppingBasket className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-semibold text-white">Ingredients</h2>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              <ul className="space-y-2">
                {recipe.ingredients?.map((ingredient, index) => (
                  <li key={index} className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0">
                    <Link 
                      to={`/ingredients/${ingredient.ingredientsID}`}
                      className="text-zinc-300 hover:text-amber-400 transition-colors"
                    >
                      {ingredient.name}
                    </Link>
                    <span className="text-zinc-500 text-sm">{ingredient.quantity}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>

          {/* Equipment */}
          <Card hover={false}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">Equipment Needed</h2>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              <div className="flex flex-wrap gap-2">
                {recipe.equipment?.map((equip, index) => (
                  <Badge key={index} variant="default">
                    {equip.name}
                  </Badge>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Served At Restaurants */}
          {servingRestaurants.length > 0 && (
            <Card hover={false}>
              <CardHeader>
                <h2 className="text-lg font-semibold text-white">Available At</h2>
              </CardHeader>
              <CardBody className="pt-0">
                <ul className="space-y-3">
                  {servingRestaurants.map((restaurant, index) => (
                    <li key={index}>
                      <Link 
                        to={`/restaurants/${restaurant.restID}`}
                        className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-white">{restaurant.name}</p>
                          <StarRating rating={restaurant.rating} size="sm" showValue={false} />
                        </div>
                        <span className="text-amber-400 font-semibold">
                          ${restaurant.price.toFixed(2)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
