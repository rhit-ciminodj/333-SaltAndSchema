import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Heart,
  History,
  ChefHat,
  Star,
  Clock,
  Flame,
  Settings
} from 'lucide-react';
import { Card, CardBody, CardHeader, Badge, StarRating, Button } from '../components/ui';
import { getUserWithHistory, currentUser } from '../data/mockData';

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState('favorites');
  const userProfile = getUserWithHistory(currentUser.userID);

  const tabs = [
    { id: 'favorites', label: 'Favorites', icon: Heart, count: userProfile.favorites.length },
    { id: 'history', label: 'History', icon: History, count: userProfile.history.length },
  ];

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
                  {userProfile.username.charAt(0)}
                </span>
              </div>
              
              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">{userProfile.username}</h1>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-zinc-400 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{userProfile.address}</span>
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-400" />
                    <span className="text-white font-medium">{userProfile.favorites.length}</span>
                    <span className="text-zinc-400">Favorites</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-400" />
                    <span className="text-white font-medium">{userProfile.history.length}</span>
                    <span className="text-zinc-400">Rated</span>
                  </div>
                </div>
              </div>

              {/* Settings Button */}
              <Button variant="secondary" className="flex-shrink-0">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap
              ${activeTab === tab.id 
                ? 'bg-amber-500 text-black' 
                : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
              }
            `}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            <Badge 
              variant={activeTab === tab.id ? 'default' : 'default'} 
              className={activeTab === tab.id ? 'bg-black/20 text-black' : ''}
            >
              {tab.count}
            </Badge>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'favorites' && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            <Heart className="w-6 h-6 inline mr-2 text-rose-400" />
            Favorite Recipes
          </h2>
          
          {userProfile.favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userProfile.favorites.map((recipe) => (
                <Link key={recipe.recipeID} to={`/recipes/${recipe.recipeID}`}>
                  <Card className="h-full group">
                    <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <Badge variant="primary">{recipe.typeOfDish}</Badge>
                      </div>
                      <ChefHat className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-zinc-700 group-hover:text-amber-500/30 transition-colors" />
                    </div>
                    <CardBody>
                      <h3 className="font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                        {recipe.name}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-zinc-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {recipe.timeToCook}m
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-4 h-4" />
                          {recipe.calories}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-zinc-400">Your rating:</span>
                        <StarRating rating={recipe.stars} size="sm" showValue={false} />
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
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            <History className="w-6 h-6 inline mr-2 text-blue-400" />
            Recipe History
          </h2>
          
          {userProfile.history.length > 0 ? (
            <Card hover={false}>
              <CardBody className="p-0">
                <div className="divide-y divide-zinc-800">
                  {userProfile.history.map((recipe) => (
                    <Link 
                      key={recipe.recipeID} 
                      to={`/recipes/${recipe.recipeID}`}
                      className="flex items-center gap-4 p-4 hover:bg-zinc-800/50 transition-colors"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ChefHat className="w-8 h-8 text-zinc-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white truncate">{recipe.name}</h3>
                          {recipe.favorites && (
                            <Heart className="w-4 h-4 text-rose-400 fill-rose-400 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-zinc-400">
                          <Badge variant="info">{recipe.typeOfDish}</Badge>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {recipe.timeToCook}m
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <StarRating rating={recipe.stars} size="sm" showValue={false} />
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
                <p className="text-zinc-400 mb-4">You haven't tried any recipes yet</p>
                <Link to="/recipes">
                  <Button variant="primary">Browse Recipes</Button>
                </Link>
              </CardBody>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
