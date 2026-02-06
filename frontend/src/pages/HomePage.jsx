import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChefHat, 
  UtensilsCrossed, 
  ShoppingBasket, 
  Store,
  Star,
  ArrowRight,
  Clock,
  Flame
} from 'lucide-react';
import { Card, CardBody, Badge, StarRating } from '../components/ui';
import { recipeApi, restaurantApi } from '../services/api';

const features = [
  {
    icon: ChefHat,
    title: 'Discover Recipes',
    description: 'Browse through a curated collection of gourmet recipes from talented home cooks.',
    link: '/recipes',
    color: 'from-amber-500 to-orange-600'
  },
  {
    icon: UtensilsCrossed,
    title: 'Find Restaurants',
    description: 'Explore local restaurants and see what dishes they have to offer.',
    link: '/restaurants',
    color: 'from-rose-500 to-pink-600'
  },
  {
    icon: ShoppingBasket,
    title: 'Shop Ingredients',
    description: 'Find where to buy the freshest ingredients at the best prices.',
    link: '/ingredients',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    icon: Store,
    title: 'Grocery Stores',
    description: 'Discover grocery stores near you and compare prices.',
    link: '/stores',
    color: 'from-blue-500 to-indigo-600'
  },
];

export function HomePage() {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [recipes, restaurants] = await Promise.all([
          recipeApi.getAll(),
          restaurantApi.getAll()
        ]);
        setFeaturedRecipes(recipes.slice(0, 4));
        setFeaturedRestaurants(restaurants.slice(0, 3));
      } catch (err) {
        console.error('Failed to load featured content:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Star className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">Your Culinary Journey Starts Here</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Discover, Cook, &</span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Savor Every Bite
              </span>
            </h1>
            
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
              Explore exquisite recipes, find the finest restaurants, and shop for premium ingredients. 
              Your complete culinary companion awaits.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/recipes"
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 transition-colors"
              >
                Explore Recipes
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/restaurants"
                className="inline-flex items-center gap-2 px-8 py-4 border border-zinc-700 text-white font-semibold rounded-xl hover:bg-zinc-800 transition-colors"
              >
                Find Restaurants
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Link key={feature.title} to={feature.link}>
                <Card className="h-full group">
                  <CardBody>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-zinc-400 text-sm">{feature.description}</p>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Featured Recipes</h2>
              <p className="text-zinc-400">Handpicked dishes loved by our community</p>
            </div>
            <Link 
              to="/recipes" 
              className="hidden sm:flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-4 text-center py-8 text-zinc-400">Loading recipes...</div>
            ) : featuredRecipes.length === 0 ? (
              <div className="col-span-4 text-center py-8 text-zinc-400">No recipes found</div>
            ) : (
              featuredRecipes.map((recipe) => (
                <Link key={recipe.recipeID} to={`/recipes/${recipe.recipeID}`}>
                  <Card className="h-full group">
                    <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <Badge variant="primary">{recipe.typeOfDish}</Badge>
                      </div>
                      <ChefHat className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-zinc-700 group-hover:text-amber-500/30 transition-colors" />
                    </div>
                    <CardBody>
                      <h3 className="font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                        {recipe.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {recipe.timeToCook} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-4 h-4" />
                          {recipe.calories} cal
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              ))
            )}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link 
              to="/recipes" 
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium"
            >
              View All Recipes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Top Restaurants</h2>
              <p className="text-zinc-400">Discover exceptional dining experiences</p>
            </div>
            <Link 
              to="/restaurants" 
              className="hidden sm:flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-3 text-center py-8 text-zinc-400">Loading restaurants...</div>
            ) : featuredRestaurants.length === 0 ? (
              <div className="col-span-3 text-center py-8 text-zinc-400">No restaurants found</div>
            ) : (
              featuredRestaurants.map((restaurant) => (
                <Link key={restaurant.restID} to={`/restaurants/${restaurant.restID}`}>
                  <Card className="h-full group">
                    <div className="aspect-[16/9] bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
                      <UtensilsCrossed className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-zinc-700 group-hover:text-amber-500/30 transition-colors" />
                    </div>
                    <CardBody>
                      <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors mb-2">
                        {restaurant.name}
                      </h3>
                      <p className="text-zinc-400 text-sm">{restaurant.address}</p>
                    </CardBody>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20" />
            <div className="relative p-8 lg:p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Start Cooking?
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto mb-8">
                Join our community of food lovers. Share your recipes, discover new favorites, 
                and connect with fellow culinary enthusiasts.
              </p>
              <Link
                to="/recipes"
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 transition-colors"
              >
                Browse All Recipes
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
