import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Clock, Flame, Users, Filter } from 'lucide-react';
import { Card, CardBody, Badge, StarRating, SearchInput, Select } from '../components/ui';
import { recipes, cuisines, getRecipeWithDetails, typeOf } from '../data/mockData';

export function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const recipesWithDetails = useMemo(() => 
    recipes.map(r => getRecipeWithDetails(r.recipeID)),
    []
  );

  const dishTypes = ['all', ...new Set(recipes.map(r => r.typeOfDish).filter(Boolean))];

  const filteredRecipes = useMemo(() => {
    let filtered = recipesWithDetails;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.name.toLowerCase().includes(query) ||
        r.description?.toLowerCase().includes(query)
      );
    }

    // Cuisine filter
    if (selectedCuisine !== 'all') {
      const cuisineID = parseInt(selectedCuisine);
      const recipeIDs = typeOf.filter(t => t.cuisineID === cuisineID).map(t => t.recipeID);
      filtered = filtered.filter(r => recipeIDs.includes(r.recipeID));
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(r => r.typeOfDish === selectedType);
    }

    // Sort
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => b.avgRating - a.avgRating);
        break;
      case 'time':
        filtered.sort((a, b) => a.timeToCook - b.timeToCook);
        break;
      case 'calories':
        filtered.sort((a, b) => a.calories - b.calories);
        break;
    }

    return filtered;
  }, [recipesWithDetails, searchQuery, selectedCuisine, selectedType, sortBy]);

  const cuisineOptions = [
    { value: 'all', label: 'All Cuisines' },
    ...cuisines.map(c => ({ value: c.cuisineID.toString(), label: c.name }))
  ];

  const typeOptions = dishTypes.map(type => ({
    value: type,
    label: type === 'all' ? 'All Types' : type
  }));

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'time', label: 'Quickest' },
    { value: 'calories', label: 'Lowest Calories' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Recipes</h1>
        <p className="text-zinc-400">Explore our collection of {recipes.length} delicious recipes</p>
      </div>

      {/* Filters */}
      <Card className="mb-8" hover={false}>
        <CardBody>
          <div className="flex items-center gap-2 mb-4 text-zinc-400">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filter & Search</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes..."
            />
            <Select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              options={cuisineOptions}
            />
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              options={typeOptions}
            />
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={sortOptions}
            />
          </div>
        </CardBody>
      </Card>

      {/* Results Count */}
      <div className="mb-6 text-zinc-400">
        Showing {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => (
          <Link key={recipe.recipeID} to={`/recipes/${recipe.recipeID}`}>
            <Card className="h-full group">
              <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <Badge variant="primary">{recipe.typeOfDish}</Badge>
                  {recipe.cuisines?.[0] && (
                    <Badge variant="info">{recipe.cuisines[0].name}</Badge>
                  )}
                </div>
                <ChefHat className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-zinc-700 group-hover:text-amber-500/30 transition-colors" />
              </div>
              <CardBody>
                <h3 className="font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {recipe.name}
                </h3>
                <p className="text-zinc-500 text-sm mb-3 line-clamp-2">
                  {recipe.description}
                </p>
                <div className="flex items-center gap-3 text-sm text-zinc-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {recipe.timeToCook}m
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-4 h-4" />
                    {recipe.calories}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {recipe.servingSize}
                  </span>
                </div>
                {recipe.avgRating > 0 ? (
                  <div className="flex items-center justify-between">
                    <StarRating rating={recipe.avgRating} size="sm" />
                    <span className="text-xs text-zinc-500">{recipe.numReviews} reviews</span>
                  </div>
                ) : (
                  <span className="text-xs text-zinc-500">No reviews yet</span>
                )}
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-16">
          <ChefHat className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No recipes found</h3>
          <p className="text-zinc-400">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}
