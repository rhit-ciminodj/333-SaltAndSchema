import axios from 'axios';

// Base axios instance - Vite proxy handles /api -> localhost:8080
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============= RECIPES =============

export const recipeApi = {
  // Get all recipes
  getAll: async () => {
    const response = await api.get('/recipes');
    return response.data.map(normalizeRecipe);
  },

  // Get recipe by ID
  getById: async (id) => {
    const response = await api.get(`/recipes/${id}`);
    return normalizeRecipe(response.data);
  },

  // Get recipe stars/rating
  getStars: async (id) => {
    try {
      const response = await api.get(`/recipes/${id}/stars`);
      return response.data;
    } catch {
      return 0;
    }
  },

  // Create a new recipe
  create: async (recipe) => {
    const response = await api.post('/recipes', {
      name: recipe.name,
      servingSize: recipe.servingSize,
      userAuthorId: recipe.userAuthorId || null,
      restaurantAuthorId: recipe.restaurantAuthorId || null,
      typeOfDish: recipe.typeOfDish,
      calories: recipe.calories,
      description: recipe.description,
      timeToCook: recipe.timeToCook,
      instructionSet: recipe.instructionSet,
    });
    return response.data;
  },

  // Update a recipe
  update: async (id, recipe) => {
    const response = await api.put(`/recipes/${id}`, {
      servingSize: recipe.servingSize,
      typeOfDish: recipe.typeOfDish,
      calories: recipe.calories,
      description: recipe.description,
      timeToCook: recipe.timeToCook,
      instructionSet: recipe.instructionSet,
    });
    return response.data;
  },

  // Match recipes by ingredient names
  matchByIngredients: async (ingredientNames) => {
    const response = await api.post('/recipes/match', ingredientNames);
    return response.data.map(normalizeRecipeMatch);
  },
};

// ============= INGREDIENTS =============

export const ingredientApi = {
  // Get all ingredients
  getAll: async () => {
    const response = await api.get('/ingredients');
    return response.data.map(normalizeIngredient);
  },

  // Get ingredient by ID
  getById: async (id) => {
    const response = await api.get(`/ingredients/${id}`);
    return normalizeIngredient(response.data);
  },

  // Get stores selling this ingredient
  getStores: async (id) => {
    const response = await api.get(`/ingredients/${id}/stores`);
    return response.data; // Returns array of store names
  },

  // Create a new ingredient
  create: async (ingredient) => {
    const response = await api.post('/ingredients', {
      name: ingredient.name,
      description: ingredient.description,
    });
    return response.data;
  },
};

// ============= RESTAURANTS =============

export const restaurantApi = {
  // Get all restaurants
  getAll: async () => {
    const response = await api.get('/restaurants');
    return response.data.map(normalizeRestaurant);
  },

  // Get restaurant by ID
  getById: async (id) => {
    const response = await api.get(`/restaurants/${id}`);
    return normalizeRestaurant(response.data);
  },

  // Create a new restaurant
  create: async (restaurant) => {
    const response = await api.post('/restaurants', {
      name: restaurant.name,
      rating: restaurant.rating,
      address: restaurant.address,
    });
    return response.data;
  },
};

// ============= GROCERY STORES =============

export const storeApi = {
  // Get all stores
  getAll: async () => {
    const response = await api.get('/grocerystores');
    return response.data.map(normalizeStore);
  },

  // Get store by ID
  getById: async (id) => {
    const response = await api.get(`/grocerystores/${id}`);
    return normalizeStore(response.data);
  },

  // Create a new store
  create: async (store) => {
    const response = await api.post('/grocerystores', {
      name: store.name,
      address: store.address,
    });
    return response.data;
  },
};

// ============= USERS =============

export const userApi = {
  // Get all users
  getAll: async () => {
    const response = await api.get('/users');
    return response.data.map(normalizeUser);
  },

  // Get user by ID
  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return normalizeUser(response.data);
  },

  // Get user by username (fetches all and filters)
  getByUsername: async (username) => {
    const users = await userApi.getAll();
    const normalized = username?.trim().toLowerCase();
    // Try exact match first, then case-insensitive
    return users.find(u => u.username === username) 
      || users.find(u => u.username?.trim().toLowerCase() === normalized) 
      || null;
  },

  // Register a new user
  register: async (username, address, password) => {
    const response = await api.post('/users/register', {
      username,
      address,
      password,
    });
    return response.data;
  },

  // Login - validates credentials and returns user data
  login: async (username, password) => {
    // First validate credentials
    await api.post('/users/login', { username, password });
    // If successful, fetch user data - retry a few times in case of timing issues
    let user = null;
    for (let i = 0; i < 3; i++) {
      user = await userApi.getByUsername(username);
      if (user) break;
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    if (!user) {
      throw new Error('User record not found after login.');
    }
    return user;
  },

  // Delete user
  delete: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  // Update username
  updateUsername: async (id, newUsername) => {
    const response = await api.put(`/users/${id}/username`, null, {
      params: { newUsername },
    });
    return response.data;
  },

  // Update address
  updateAddress: async (id, newAddress) => {
    const response = await api.put(`/users/${id}/address`, null, {
      params: { newAddress },
    });
    return response.data;
  },
};

// ============= HAS EATEN (Rating & Favorites) =============

export const hasEatenApi = {
  // Get user's recipe history (all rated/eaten recipes)
  getHistory: async (userId) => {
    const response = await api.get(`/has-eaten/${userId}/history`);
    return response.data.map(normalizeHasEaten);
  },

  // Get user's favorite recipes
  getFavorites: async (userId) => {
    const response = await api.get(`/has-eaten/${userId}/favorites`);
    return response.data.map(normalizeHasEaten);
  },

  // Get user's rating for a specific recipe
  getUserRating: async (userId, recipeId) => {
    try {
      const response = await api.get(`/has-eaten/${userId}/recipes/${recipeId}`);
      return response.data ? normalizeHasEaten(response.data) : null;
    } catch {
      return null;
    }
  },

  rateRecipe: async (userId, recipeId, stars, favorites = false) => {
    const response = await api.post(`/has-eaten/${userId}/recipes/${recipeId}/rate`, {
      stars,
      favorites,
    });
    return response.data;
  },

  // Update just the favorite status (for existing record)
  updateFavorite: async (userId, recipeId, favorites) => {
    const response = await api.put(`/has-eaten/${userId}/recipes/${recipeId}/favorite`, null, {
      params: { favorites },
    });
    return response.data;
  },

  // Update just the stars (for existing record)
  updateStars: async (userId, recipeId, stars) => {
    const response = await api.put(`/has-eaten/${userId}/recipes/${recipeId}/stars`, null, {
      params: { stars },
    });
    return response.data;
  },
};

// ============= BEST PAIRS WITH =============

export const bestPairsWithApi = {
  // Get all best pairs for a main recipe
  getByMainRecipe: async (mainRecipeId) => {
    const response = await api.get(`/best-pairs-with/${mainRecipeId}`);
    return response.data.map(normalizeBestPairsWith);
  },

  // Add a new best pairs with combo
  create: async (mainRecipeId, sideRecipeId) => {
    const response = await api.post(`/best-pairs-with/${mainRecipeId}/${sideRecipeId}`);
    return response.data;
  },
};

// ============= SUBSTITUTES =============

export const substitutesApi = {
  // Get all substitutes for an ingredient
  getByIngredient: async (ingredientId) => {
    const response = await api.get(`/substitutes/${ingredientId}`);
    return response.data.map(normalizeSubstitutes);
  },

  // Add a new substitute
  create: async (ingredientId, substituteId) => {
    const response = await api.post(`/substitutes/${ingredientId}/${substituteId}`);
    return response.data;
  },
};

// ============= EQUIPMENT =============

export const equipmentApi = {
  // Get all equipment
  getAll: async () => {
    const response = await api.get('/equipment');
    return response.data.map(normalizeEquipment);
  },

  // Get equipment by ID
  getById: async (id) => {
    const response = await api.get(`/equipment/${id}`);
    return normalizeEquipment(response.data);
  },

  // Create new equipment
  create: async (equipment) => {
    const response = await api.post('/equipment', {
      name: equipment.name,
      description: equipment.description,
    });
    return response.data;
  },
};

// ============= USING INGREDIENTS (Recipe-Ingredient Link) =============

export const usingIngredientsApi = {
  // Get ingredients for a recipe
  getByRecipe: async (recipeId) => {
    const response = await api.get(`/UsingIngredients/${recipeId}`);
    return response.data.map(normalizeUsingIngredients);
  },

  // Add an ingredient to a recipe
  addToRecipe: async (ingredientId, recipeId, amount) => {
    const response = await api.post(`/UsingIngredients/${ingredientId}/${recipeId}/${amount}`);
    return response.data;
  },
};

// ============= USING EQUIPMENT (Recipe-Equipment Link) =============

export const usingEquipApi = {
  // Get equipment for a recipe
  getByRecipe: async (recipeId) => {
    const response = await api.get(`/UsingEquipController/${recipeId}`);
    return response.data.map(normalizeUsingEquip);
  },

  // Add equipment to a recipe
  addToRecipe: async (recipeId, equipId) => {
    const response = await api.post(`/UsingEquipController/${recipeId}/${equipId}`);
    return response.data;
  },
};

// ============= CUISINES =============

export const cuisineApi = {
  // Get all cuisines
  getAll: async () => {
    const response = await api.get('/cuisines');
    return response.data.map(normalizeCuisine);
  },

  // Get cuisine by ID
  getById: async (id) => {
    const response = await api.get(`/cuisines/${id}`);
    return normalizeCuisine(response.data);
  },

  // Create a new cuisine
  create: async (cuisine) => {
    const response = await api.post('/cuisines', {
      name: cuisine.name,
      description: cuisine.description,
    });
    return response.data;
  },
};

// ============= TYPE OF (Recipe-Cuisine Link) =============

export const typeOfApi = {
  // Get cuisines for a recipe
  getByRecipe: async (recipeId) => {
    const response = await api.get(`/type-of/recipe/${recipeId}`);
    return response.data.map(normalizeTypeOf);
  },

  // Get recipes by cuisine
  getByCuisine: async (cuisineId) => {
    const response = await api.get(`/type-of/cuisine/${cuisineId}`);
    return response.data.map(normalizeTypeOf);
  },

  // Add cuisine to recipe
  addCuisineToRecipe: async (cuisineId, recipeId) => {
    const response = await api.post('/type-of/add', {
      id: { cuisineId, recipeId },
    });
    return response.data;
  },
};

// ============= COOKS (Restaurant-Recipe Link) =============

export const cooksApi = {
  // Get recipes by restaurant
  getByRestaurant: async (restaurantId) => {
    const response = await api.get(`/cooks/restaurant/${restaurantId}`);
    return response.data.map(normalizeCooks);
  },

  // Add recipe to restaurant with price
  addRecipeToRestaurant: async (restaurantId, recipeId, price) => {
    const response = await api.post(`/cooks/restaurant/${restaurantId}/recipe/${recipeId}/price/${price}`);
    return response.data;
  },
};

// ============= SOLD BY (Store-Ingredient Link) =============

export const soldByApi = {
  // Get ingredients by store
  getByStore: async (storeId) => {
    const response = await api.get(`/soldby/store/${storeId}`);
    return response.data.map(normalizeSoldBy);
  },

  // Add ingredient to store with price
  addIngredientToStore: async (ingredientId, storeId, price) => {
    const response = await api.post('/soldby/add', {
      id: { ingredientId, storeId },
      price,
    });
    return response.data;
  },
};

// ============= RESTAURANT OWNERS =============

export const restaurantOwnersApi = {
  // Check if user is a restaurant owner
  isOwner: async (userId) => {
    const response = await api.get(`/restaurantowners/isowner/${userId}`);
    return response.data;
  },

  // Get user's owned restaurant
  getOwnedRestaurant: async (userId) => {
    const response = await api.get(`/restaurantowners/${userId}`);
    return response.data;
  },

  // Assign restaurant to owner
  assignRestaurant: async (userId, restaurantId) => {
    const response = await api.post(`/restaurantowners/assign/${userId}/${restaurantId}`);
    return response.data;
  },
};

// ============= GROCERY STORE OWNERS =============

export const groceryStoreOwnersApi = {
  // Check if user is a grocery store owner
  isOwner: async (userId) => {
    const response = await api.get(`/grocerystoreowners/isowner/${userId}`);
    return response.data;
  },

  // Get user's owned grocery store
  getOwnedStore: async (userId) => {
    const response = await api.get(`/grocerystoreowners/${userId}`);
    return response.data;
  },

  // Assign grocery store to owner
  assignStore: async (userId, storeId) => {
    const response = await api.post(`/grocerystoreowners/assign/${userId}/${storeId}`);
    return response.data;
  },
};

// ============= AUTH HELPERS =============

const AUTH_KEY = 'saltandschema_user';

export const authUtils = {
  // Save user to localStorage
  saveUser: (user) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  },

  // Get current user from localStorage
  getUser: () => {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  },

  // Clear user from localStorage (logout)
  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return !!localStorage.getItem(AUTH_KEY);
  },
};

// ============= NORMALIZATION FUNCTIONS =============
// Map backend entity field names to frontend expected field names

function normalizeRecipe(recipe) {
  if (!recipe) return null;
  return {
    recipeID: recipe.recipeId,
    name: recipe.name,
    servingSize: recipe.servingSize,
    authorID: recipe.userAuthorId,
    restaurantAuthorID: recipe.restaurantAuthorId,
    typeOfDish: recipe.typeOfDish,
    calories: recipe.calories,
    description: recipe.description,
    timeToCook: recipe.timeToCook,
    instructionSet: recipe.instructionSet,
  };
}

function normalizeRecipeMatch(recipe) {
  const base = normalizeRecipe(recipe);
  if (!base) return null;
  return {
    ...base,
    matchedCount: recipe.matchedCount ?? 0,
    totalCount: recipe.totalCount ?? 0,
    matchPercent: recipe.matchPercent ?? 0,
  };
}

function normalizeIngredient(ingredient) {
  if (!ingredient) return null;
  return {
    ingredientsID: ingredient.ingredientId,
    name: ingredient.name,
    description: ingredient.description,
  };
}

function normalizeRestaurant(restaurant) {
  if (!restaurant) return null;
  return {
    restID: restaurant.restaurantId,
    name: restaurant.name,
    rating: parseFloat(restaurant.rating) || 0,
    address: restaurant.address,
  };
}

function normalizeStore(store) {
  if (!store) return null;
  return {
    storeID: store.groceryStoreId,
    name: store.name,
    address: store.address,
  };
}

function normalizeEquipment(equipment) {
  if (!equipment) return null;
  return {
    equipID: equipment.equipmentId,
    name: equipment.name,
    description: equipment.description,
  };
}

function normalizeUser(user) {
  if (!user) return null;
  return {
    userID: user.userId,
    username: user.username,
    address: user.address,
  };
}

function normalizeHasEaten(hasEaten) {
  if (!hasEaten) return null;
  return {
    userID: hasEaten.id?.userId,
    recipeID: hasEaten.id?.recipeId,
    favorites: hasEaten.favorites,
    stars: hasEaten.stars,
  };
}

function normalizeBestPairsWith(pair) {
  if (!pair) return null;
  return {
    mainRecipeID: pair.id?.mainRecipeId,
    sideRecipeID: pair.id?.sideRecipeId,
  };
}

function normalizeSubstitutes(substitute) {
  if (!substitute) return null;
  return {
    ingredientID: substitute.id?.ingredientId,
    substituteID: substitute.id?.substituteId,
  };
}

function normalizeUsingIngredients(usingIngredient) {
  if (!usingIngredient) return null;
  return {
    ingredientID: usingIngredient.id?.ingredientId,
    recipeID: usingIngredient.id?.recipeId,
    quantity: usingIngredient.quantity,
  };
}

function normalizeUsingEquip(usingEquip) {
  if (!usingEquip) return null;
  return {
    recipeID: usingEquip.id?.recipeId,
    equipmentID: usingEquip.id?.equipmentId,
  };
}

function normalizeCuisine(cuisine) {
  if (!cuisine) return null;
  return {
    cuisineID: cuisine.cuisineId,
    name: cuisine.name,
    description: cuisine.description,
  };
}

function normalizeTypeOf(typeOf) {
  if (!typeOf) return null;
  return {
    cuisineID: typeOf.id?.cuisineId,
    recipeID: typeOf.id?.recipeId,
  };
}

function normalizeCooks(cooks) {
  if (!cooks) return null;
  return {
    restaurantID: cooks.id?.restaurantId,
    recipeID: cooks.id?.recipeId,
    costOfItem: cooks.costOfItem,
  };
}

function normalizeSoldBy(soldBy) {
  if (!soldBy) return null;
  return {
    ingredientID: soldBy.id?.ingredientId,
    storeID: soldBy.id?.storeId,
    price: soldBy.price,
  };
}

export default api;
