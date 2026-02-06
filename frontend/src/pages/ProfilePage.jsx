import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Heart,
  History,
  ChefHat,
  Star,
  Clock,
  Flame,
  Settings,
  LogIn,
  LogOut,
  Save
} from 'lucide-react';
import { Card, CardBody, CardHeader, Badge, StarRating, Button, Input } from '../components/ui';
import { authUtils, userApi, hasEatenApi, recipeApi } from '../services/api';

export function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('favorites');
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: '', address: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const currentUser = authUtils.getUser();
    if (currentUser) {
      setUser(currentUser);
      setEditForm({ username: currentUser.username, address: currentUser.address });
      loadUserData(currentUser.userID);
    }
  }, []);

  const loadUserData = async (userId) => {
    setLoadingData(true);
    try {
      const [favData, histData] = await Promise.all([
        hasEatenApi.getFavorites(userId),
        hasEatenApi.getHistory(userId)
      ]);
      
      // Fetch recipe details for favorites and history
      const allRecipeIds = [...new Set([
        ...favData.map(f => f.recipeID),
        ...histData.map(h => h.recipeID)
      ])];
      
      const recipes = await Promise.all(
        allRecipeIds.map(id => recipeApi.getById(id).catch(() => null))
      );
      const recipeMap = {};
      recipes.filter(Boolean).forEach(r => recipeMap[r.recipeID] = r);
      
      setFavorites(favData.map(f => ({ ...f, recipe: recipeMap[f.recipeID] })).filter(f => f.recipe));
      setHistory(histData.map(h => ({ ...h, recipe: recipeMap[h.recipeID] })).filter(h => h.recipe));
    } catch (err) {
      console.error('Failed to load user data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogout = () => {
    authUtils.logout();
    setUser(null);
    navigate('/');
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      if (editForm.username !== user.username) {
        await userApi.updateUsername(user.userID, editForm.username);
      }
      if (editForm.address !== user.address) {
        await userApi.updateAddress(user.userID, editForm.address);
      }
      // Refresh user data
      const updatedUser = await userApi.getById(user.userID);
      authUtils.saveUser(updatedUser);
      setUser(updatedUser);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card hover={false}>
          <CardBody className="text-center py-16">
            <div className="w-20 h-20 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-zinc-600" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Welcome to Salt & Schema</h2>
            <p className="text-zinc-400 max-w-md mx-auto mb-8">
              Log in to access your profile, save favorite recipes, and track your cooking history.
            </p>
            <Link to="/login">
              <Button variant="primary" className="inline-flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Login or Register
              </Button>
            </Link>
          </CardBody>
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card hover={false}>
            <CardBody className="text-center py-8">
              <Heart className="w-12 h-12 text-rose-400/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Save Favorites</h3>
              <p className="text-zinc-400 text-sm">
                Keep track of recipes you love for quick access later.
              </p>
            </CardBody>
          </Card>
          <Card hover={false}>
            <CardBody className="text-center py-8">
              <History className="w-12 h-12 text-blue-400/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Cooking History</h3>
              <p className="text-zinc-400 text-sm">
                Track what you've cooked and rate your experiences.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Header */}
      <div className="mb-8">
        <Card hover={false}>
          <CardBody>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-4xl font-bold text-black">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              
              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                {isEditing ? (
                  <div className="space-y-4">
                    <Input
                      label="Username"
                      value={editForm.username}
                      onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    />
                    <Input
                      label="Address"
                      value={editForm.address}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    />
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    {success && <p className="text-emerald-400 text-sm">{success}</p>}
                    <div className="flex gap-2">
                      <Button variant="primary" onClick={handleSave} disabled={saving}>
                        <Save className="w-4 h-4 mr-1" />
                        {saving ? 'Saving...' : 'Save'}
                      </Button>
                      <Button variant="secondary" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold text-white mb-2">{user.username}</h1>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-zinc-400 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{user.address || 'No address set'}</span>
                    </div>
                    <p className="text-zinc-500 text-sm">User ID: {user.userID}</p>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              {!isEditing && (
                <div className="flex gap-2 flex-shrink-0">
                  <Button variant="secondary" onClick={() => setIsEditing(true)}>
                    <Settings className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="danger" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'favorites' 
              ? 'bg-amber-500 text-black' 
              : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
          }`}
        >
          <Heart className="w-4 h-4" />
          Favorites
          <Badge className={activeTab === 'favorites' ? 'bg-black/20 text-black' : ''}>
            {favorites.length}
          </Badge>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'history' 
              ? 'bg-amber-500 text-black' 
              : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
          }`}
        >
          <History className="w-4 h-4" />
          History
          <Badge className={activeTab === 'history' ? 'bg-black/20 text-black' : ''}>
            {history.length}
          </Badge>
        </button>
      </div>

      {/* Content */}
      {loadingData ? (
        <Card hover={false}>
          <CardBody className="text-center py-12">
            <ChefHat className="w-12 h-12 text-zinc-700 mx-auto mb-4 animate-pulse" />
            <p className="text-zinc-400">Loading your data...</p>
          </CardBody>
        </Card>
      ) : activeTab === 'favorites' ? (
        favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((fav) => (
              <Link key={fav.recipeID} to={`/recipes/${fav.recipeID}`}>
                <Card className="h-full group">
                  <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
                    <Heart className="absolute top-3 right-3 w-5 h-5 text-rose-400 fill-rose-400" />
                    <ChefHat className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-zinc-700 group-hover:text-amber-500/30 transition-colors" />
                  </div>
                  <CardBody>
                    <h3 className="font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {fav.recipe.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Star className="w-4 h-4 text-amber-400" />
                      <span>Your rating: {fav.stars} stars</span>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card hover={false}>
            <CardBody className="text-center py-12">
              <Heart className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-400 mb-4">You haven't favorited any recipes yet</p>
              <Link to="/recipes">
                <Button variant="primary">Browse Recipes</Button>
              </Link>
            </CardBody>
          </Card>
        )
      ) : (
        history.length > 0 ? (
          <Card hover={false}>
            <CardBody className="p-0">
              <div className="divide-y divide-zinc-800">
                {history.map((item) => (
                  <Link 
                    key={item.recipeID} 
                    to={`/recipes/${item.recipeID}`}
                    className="flex items-center gap-4 p-4 hover:bg-zinc-800/50 transition-colors"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ChefHat className="w-8 h-8 text-zinc-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white truncate">{item.recipe.name}</h3>
                        {item.favorites && (
                          <Heart className="w-4 h-4 text-rose-400 fill-rose-400 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-zinc-400">
                        <Badge variant="info">{item.recipe.typeOfDish}</Badge>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`w-4 h-4 ${star <= item.stars ? 'text-amber-400 fill-amber-400' : 'text-zinc-600'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-zinc-500">Your rating</span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardBody>
          </Card>
        ) : (
          <Card hover={false}>
            <CardBody className="text-center py-12">
              <History className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-400 mb-4">You haven't rated any recipes yet</p>
              <Link to="/recipes">
                <Button variant="primary">Browse Recipes</Button>
              </Link>
            </CardBody>
          </Card>
        )
      )}
    </div>
  );
}
