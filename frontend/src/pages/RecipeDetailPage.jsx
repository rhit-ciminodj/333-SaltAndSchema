import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  Flame, 
  Users, 
  ChefHat, 
  ArrowLeft,
  Heart,
  Share2,
  BookOpen,
  Edit2,
  Star
} from 'lucide-react';
import { Card, CardBody, CardHeader, Badge, Button, Input } from '../components/ui';
import { recipeApi, hasEatenApi, authUtils } from '../services/api';
import { useState, useEffect } from 'react';

export function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [ratingLoading, setRatingLoading] = useState(false);
  const [ratingSuccess, setRatingSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  
  const user = authUtils.getUser();

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    try {
      setLoading(true);
      const data = await recipeApi.getById(parseInt(id));
      setRecipe(data);
      setEditForm({
        servingSize: data.servingSize || 2,
        typeOfDish: data.typeOfDish || '',
        calories: data.calories || 0,
        description: data.description || '',
        timeToCook: data.timeToCook || 30,
        instructionSet: data.instructionSet || '',
      });
      
      // Load user's existing rating if logged in
      if (user) {
        try {
          const existing = await hasEatenApi.getUserRating(user.userID, parseInt(id));
          if (existing) {
            setUserRating(existing.stars);
            setIsFavorite(existing.favorites);
          }
        } catch (e) {
          // User hasn't rated this recipe yet
        }
      }
      
      setError('');
    } catch (err) {
      setError('Recipe not found');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError('');
    try {
      await recipeApi.update(parseInt(id), editForm);
      setIsEditing(false);
      loadRecipe();
    } catch (err) {
      setEditError(err.response?.data || 'Failed to update recipe');
    } finally {
      setEditLoading(false);
    }
  };

  const handleRateRecipe = async (stars) => {
    if (!user) {
      setRatingSuccess('Please log in to rate recipes');
      return;
    }
    setRatingLoading(true);
    setRatingSuccess('');
    try {
      // Check if user already has a record for this recipe
      const existing = await hasEatenApi.getUserRating(user.userID, parseInt(id));
      if (existing) {
        // Update just the stars
        await hasEatenApi.updateStars(user.userID, parseInt(id), stars);
      } else {
        // Create new record with sproc
        await hasEatenApi.rateRecipe(user.userID, parseInt(id), stars, false);
      }
      setUserRating(stars);
      setRatingSuccess(`Rated ${stars} stars!`);
    } catch (err) {
      setRatingSuccess('Failed to save rating');
    } finally {
      setRatingLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      setRatingSuccess('Please log in to favorite recipes');
      return;
    }
    setRatingLoading(true);
    try {
      const newFavorite = !isFavorite;
      // Check if user already has a record for this recipe
      const existing = await hasEatenApi.getUserRating(user.userID, parseInt(id));
      if (existing) {
        // Update just the favorite status
        await hasEatenApi.updateFavorite(user.userID, parseInt(id), newFavorite);
      } else {
        // Create new record with sproc (default 5 stars when favoriting without rating)
        await hasEatenApi.rateRecipe(user.userID, parseInt(id), 5, newFavorite);
        setUserRating(5);
      }
      setIsFavorite(newFavorite);
      setRatingSuccess(newFavorite ? 'Added to favorites!' : 'Removed from favorites');
    } catch (err) {
      setRatingSuccess('Failed to update favorite');
    } finally {
      setRatingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <ChefHat className="w-16 h-16 text-zinc-700 mx-auto mb-4 animate-pulse" />
        <p className="text-zinc-400">Loading recipe...</p>
      </div>
    );
  }

  if (error || !recipe) {
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
              {recipe.typeOfDish && <Badge variant="info">{recipe.typeOfDish}</Badge>}
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{recipe.name}</h1>
            <p className="text-zinc-400 text-lg mb-6">{recipe.description}</p>
            
            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6">
              {recipe.timeToCook && (
                <div className="flex items-center gap-2 text-zinc-400">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span>{recipe.timeToCook} minutes</span>
                </div>
              )}
              {recipe.calories && (
                <div className="flex items-center gap-2 text-zinc-400">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <span>{recipe.calories} calories</span>
                </div>
              )}
              {recipe.servingSize && (
                <div className="flex items-center gap-2 text-zinc-400">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span>Serves {recipe.servingSize}</span>
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
                {recipe.instructionSet ? (
                  recipe.instructionSet.split(/\d+\.\s+/).filter(Boolean).map((step, index) => (
                    <div key={index} className="flex gap-4 mb-4 last:mb-0">
                      <div className="flex-shrink-0 w-8 h-8 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-zinc-300 pt-1">{step.trim()}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-zinc-500">No instructions available.</p>
                )}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Rating */}
          <Card hover={false}>
            <CardHeader>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" />
                Rate this Recipe
              </h3>
            </CardHeader>
            <CardBody>
              {user ? (
                <>
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRateRecipe(star)}
                        disabled={ratingLoading}
                        className="p-1 hover:scale-110 transition-transform disabled:opacity-50"
                      >
                        <Star 
                          className={`w-8 h-8 ${star <= userRating ? 'text-amber-400 fill-amber-400' : 'text-zinc-600'}`} 
                        />
                      </button>
                    ))}
                  </div>
                  {ratingSuccess && (
                    <p className={`text-sm ${ratingSuccess.includes('Failed') ? 'text-red-400' : 'text-emerald-400'}`}>
                      {ratingSuccess}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-zinc-400 text-sm">
                  <Link to="/login" className="text-amber-400 hover:underline">Log in</Link> to rate this recipe
                </p>
              )}
            </CardBody>
          </Card>

          {/* Actions */}
          <Card hover={false}>
            <CardBody>
              <div className="flex gap-3">
                <Button 
                  variant={isFavorite ? 'primary' : 'secondary'} 
                  className="flex-1"
                  onClick={handleToggleFavorite}
                  disabled={ratingLoading}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Favorited' : 'Favorite'}
                </Button>
                <Button variant="secondary" onClick={() => setIsEditing(!isEditing)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Edit Form */}
          {isEditing && (
            <Card hover={false}>
              <CardHeader>
                <h3 className="text-lg font-semibold text-white">Edit Recipe</h3>
              </CardHeader>
              <CardBody>
                <form onSubmit={handleUpdate} className="space-y-4">
                  <Input
                    label="Type of Dish"
                    value={editForm.typeOfDish}
                    onChange={(e) => setEditForm({ ...editForm, typeOfDish: e.target.value })}
                  />
                  <Input
                    label="Serving Size"
                    type="number"
                    value={editForm.servingSize}
                    onChange={(e) => setEditForm({ ...editForm, servingSize: parseInt(e.target.value) })}
                  />
                  <Input
                    label="Calories"
                    type="number"
                    value={editForm.calories}
                    onChange={(e) => setEditForm({ ...editForm, calories: parseInt(e.target.value) })}
                  />
                  <Input
                    label="Time to Cook (min)"
                    type="number"
                    value={editForm.timeToCook}
                    onChange={(e) => setEditForm({ ...editForm, timeToCook: parseInt(e.target.value) })}
                  />
                  <Input
                    label="Description"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  />
                  <Input
                    label="Instructions"
                    value={editForm.instructionSet}
                    onChange={(e) => setEditForm({ ...editForm, instructionSet: e.target.value })}
                  />
                  {editError && <p className="text-red-400 text-sm">{editError}</p>}
                  <div className="flex gap-2">
                    <Button type="submit" disabled={editLoading}>
                      {editLoading ? 'Saving...' : 'Save'}
                    </Button>
                    <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
