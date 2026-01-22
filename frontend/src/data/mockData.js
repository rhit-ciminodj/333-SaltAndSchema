// Mock data matching the database schema
// These are placeholders - will be replaced with actual backend API calls

// Users table mock data
export const users = [
  { userID: 1, username: "ChefMaster", address: "123 Culinary Lane, Food City" },
  { userID: 2, username: "HomeCook22", address: "456 Kitchen Ave, Tasteville" },
  { userID: 3, username: "GourmetGuru", address: "789 Flavor St, Spicetown" },
  { userID: 4, username: "BakingQueen", address: "321 Pastry Blvd, Sweetland" },
  { userID: 5, username: "SavorySam", address: "654 Umami Road, Delishburg" },
];

// Restaurant table mock data
export const restaurants = [
  { restID: 1, name: "The Golden Fork", rating: 4.75, address: "100 Fine Dining Dr" },
  { restID: 2, name: "Bistro Elegance", rating: 4.50, address: "200 Gourmet Way" },
  { restID: 3, name: "Casa Bella", rating: 4.25, address: "300 Italian Plaza" },
  { restID: 4, name: "Sakura House", rating: 4.80, address: "400 Tokyo Street" },
  { restID: 5, name: "Le Petit Chef", rating: 4.60, address: "500 Paris Avenue" },
  { restID: 6, name: "The Spice Route", rating: 4.35, address: "600 Curry Lane" },
];

// Recipe table mock data
export const recipes = [
  {
    recipeID: 1,
    name: "Classic Beef Steak",
    servingSize: 2,
    authorID: 1,
    typeOfDish: "Main",
    calories: 650,
    description: "A perfectly seared ribeye steak with herb butter, served with roasted vegetables.",
    timeToCook: 30,
    instructionSet: "1. Season steak with salt and pepper. 2. Heat cast iron pan. 3. Sear 4 min each side. 4. Rest 5 minutes. 5. Top with herb butter."
  },
  {
    recipeID: 2,
    name: "Truffle Risotto",
    servingSize: 4,
    authorID: 2,
    typeOfDish: "Main",
    calories: 480,
    description: "Creamy Arborio rice infused with black truffle and aged Parmesan cheese.",
    timeToCook: 45,
    instructionSet: "1. Toast rice in butter. 2. Add wine. 3. Gradually add warm broth. 4. Stir constantly. 5. Finish with truffle oil and Parmesan."
  },
  {
    recipeID: 3,
    name: "Chocolate Lava Cake",
    servingSize: 2,
    authorID: 4,
    typeOfDish: "Dessert",
    calories: 520,
    description: "Rich chocolate cake with a molten center, served with vanilla ice cream.",
    timeToCook: 25,
    instructionSet: "1. Melt chocolate and butter. 2. Whisk eggs and sugar. 3. Combine mixtures. 4. Add flour. 5. Bake at 425°F for 12 minutes."
  },
  {
    recipeID: 4,
    name: "Caesar Salad",
    servingSize: 2,
    authorID: 3,
    typeOfDish: "Appetizer",
    calories: 280,
    description: "Crisp romaine lettuce with homemade Caesar dressing and garlic croutons.",
    timeToCook: 15,
    instructionSet: "1. Make dressing with anchovy, garlic, egg yolk. 2. Toss romaine. 3. Add croutons and Parmesan. 4. Serve immediately."
  },
  {
    recipeID: 5,
    name: "Miso Glazed Salmon",
    servingSize: 2,
    authorID: 1,
    typeOfDish: "Main",
    calories: 420,
    description: "Fresh Atlantic salmon with sweet white miso glaze and sesame seeds.",
    timeToCook: 20,
    instructionSet: "1. Mix miso, mirin, sake, sugar. 2. Marinate salmon 30 min. 3. Broil 8-10 minutes. 4. Garnish with sesame and scallions."
  },
  {
    recipeID: 6,
    name: "French Onion Soup",
    servingSize: 4,
    authorID: 5,
    typeOfDish: "Appetizer",
    calories: 350,
    description: "Caramelized onion soup topped with crusty bread and melted Gruyère cheese.",
    timeToCook: 60,
    instructionSet: "1. Slowly caramelize onions 45 min. 2. Add beef broth. 3. Simmer 15 min. 4. Top with bread and cheese. 5. Broil until bubbly."
  },
  {
    recipeID: 7,
    name: "Tiramisu",
    servingSize: 6,
    authorID: 4,
    typeOfDish: "Dessert",
    calories: 450,
    description: "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone cream.",
    timeToCook: 30,
    instructionSet: "1. Whip mascarpone with sugar. 2. Dip ladyfingers in espresso. 3. Layer cream and cookies. 4. Refrigerate 4 hours. 5. Dust with cocoa."
  },
  {
    recipeID: 8,
    name: "Lobster Bisque",
    servingSize: 4,
    authorID: 3,
    typeOfDish: "Appetizer",
    calories: 380,
    description: "Velvety smooth lobster soup with a hint of brandy and fresh tarragon.",
    timeToCook: 50,
    instructionSet: "1. Sauté lobster shells. 2. Add aromatics and tomato paste. 3. Simmer with stock. 4. Strain and blend. 5. Finish with cream and brandy."
  },
];

// Cuisine table mock data
export const cuisines = [
  { cuisineID: 1, name: "Italian", description: "Traditional dishes from Italy featuring pasta, olive oil, and fresh ingredients." },
  { cuisineID: 2, name: "French", description: "Classic French cuisine known for rich sauces and refined techniques." },
  { cuisineID: 3, name: "Japanese", description: "Japanese cooking emphasizing fresh, seasonal ingredients and umami flavors." },
  { cuisineID: 4, name: "American", description: "Diverse American dishes from comfort food to modern fusion." },
  { cuisineID: 5, name: "Mexican", description: "Bold flavors with chilies, corn, and traditional spices." },
  { cuisineID: 6, name: "Indian", description: "Rich, aromatic dishes with complex spice blends." },
];

// Ingredients table mock data
export const ingredients = [
  { ingredientsID: 1, name: "Ribeye Steak", description: "Premium cut of beef, well-marbled for flavor" },
  { ingredientsID: 2, name: "Arborio Rice", description: "Short-grain Italian rice perfect for risotto" },
  { ingredientsID: 3, name: "Black Truffle", description: "Luxurious aromatic fungi from France" },
  { ingredientsID: 4, name: "Dark Chocolate", description: "70% cacao bittersweet chocolate" },
  { ingredientsID: 5, name: "Romaine Lettuce", description: "Crisp, sturdy lettuce for salads" },
  { ingredientsID: 6, name: "Atlantic Salmon", description: "Fresh salmon fillet, skin-on" },
  { ingredientsID: 7, name: "White Miso", description: "Sweet, mild fermented soybean paste" },
  { ingredientsID: 8, name: "Yellow Onions", description: "All-purpose cooking onions" },
  { ingredientsID: 9, name: "Gruyère Cheese", description: "Nutty Swiss cheese that melts beautifully" },
  { ingredientsID: 10, name: "Mascarpone", description: "Rich Italian cream cheese" },
  { ingredientsID: 11, name: "Ladyfingers", description: "Light, dry sponge biscuits" },
  { ingredientsID: 12, name: "Lobster", description: "Fresh Maine lobster" },
  { ingredientsID: 13, name: "Heavy Cream", description: "36% milk fat cream for cooking" },
  { ingredientsID: 14, name: "Parmesan", description: "Aged Italian hard cheese" },
  { ingredientsID: 15, name: "Butter", description: "Unsalted European-style butter" },
  { ingredientsID: 16, name: "Garlic", description: "Fresh garlic cloves" },
  { ingredientsID: 17, name: "Olive Oil", description: "Extra virgin olive oil" },
  { ingredientsID: 18, name: "Eggs", description: "Large free-range eggs" },
];

// Equipment table mock data
export const equipment = [
  { equipID: 1, name: "Cast Iron Pan", description: "Heavy-duty pan for perfect searing" },
  { equipID: 2, name: "Chef's Knife", description: "8-inch professional chef's knife" },
  { equipID: 3, name: "Dutch Oven", description: "Enameled cast iron pot for braising" },
  { equipID: 4, name: "Stand Mixer", description: "Professional stand mixer for baking" },
  { equipID: 5, name: "Ramekins", description: "Individual oven-safe baking dishes" },
  { equipID: 6, name: "Stock Pot", description: "Large pot for soups and stocks" },
  { equipID: 7, name: "Immersion Blender", description: "Hand-held blender for pureeing" },
  { equipID: 8, name: "Whisk", description: "Stainless steel balloon whisk" },
  { equipID: 9, name: "Cutting Board", description: "Large wooden cutting board" },
  { equipID: 10, name: "Tongs", description: "Stainless steel kitchen tongs" },
];

// GroceryStores table mock data
export const groceryStores = [
  { storeID: 1, name: "Whole Foods", address: "1000 Organic Blvd, Health City" },
  { storeID: 2, name: "Trader Joe's", address: "2000 Value Lane, Savings Town" },
  { storeID: 3, name: "Fresh Market", address: "3000 Gourmet Way, Fine Foods" },
  { storeID: 4, name: "Kroger", address: "4000 Main Street, Everyday City" },
  { storeID: 5, name: "Wegmans", address: "5000 Premium Ave, Quality Town" },
];

// HasEaten junction table mock data (User ratings/favorites)
export const hasEaten = [
  { userID: 1, recipeID: 1, favorites: true, stars: 5 },
  { userID: 1, recipeID: 2, favorites: true, stars: 4 },
  { userID: 1, recipeID: 3, favorites: false, stars: 4 },
  { userID: 2, recipeID: 1, favorites: true, stars: 5 },
  { userID: 2, recipeID: 4, favorites: true, stars: 5 },
  { userID: 2, recipeID: 5, favorites: false, stars: 4 },
  { userID: 3, recipeID: 2, favorites: true, stars: 5 },
  { userID: 3, recipeID: 6, favorites: false, stars: 3 },
  { userID: 3, recipeID: 7, favorites: true, stars: 5 },
  { userID: 4, recipeID: 3, favorites: true, stars: 5 },
  { userID: 4, recipeID: 7, favorites: true, stars: 5 },
  { userID: 5, recipeID: 1, favorites: false, stars: 4 },
  { userID: 5, recipeID: 6, favorites: true, stars: 5 },
  { userID: 5, recipeID: 8, favorites: true, stars: 4 },
];

// Cooks junction table mock data (Restaurant menu items)
export const cooks = [
  { restaurantID: 1, recipeID: 1, costOfItem: 45.99 },
  { restaurantID: 1, recipeID: 8, costOfItem: 18.99 },
  { restaurantID: 2, recipeID: 2, costOfItem: 32.99 },
  { restaurantID: 2, recipeID: 4, costOfItem: 14.99 },
  { restaurantID: 3, recipeID: 2, costOfItem: 28.99 },
  { restaurantID: 3, recipeID: 7, costOfItem: 12.99 },
  { restaurantID: 4, recipeID: 5, costOfItem: 36.99 },
  { restaurantID: 5, recipeID: 6, costOfItem: 16.99 },
  { restaurantID: 5, recipeID: 3, costOfItem: 14.99 },
  { restaurantID: 6, recipeID: 5, costOfItem: 29.99 },
];

// BestPairsWith junction table mock data
export const bestPairsWith = [
  { mainRecipeID: 1, sideRecipeID: 4 }, // Steak pairs with Caesar Salad
  { mainRecipeID: 1, sideRecipeID: 6 }, // Steak pairs with French Onion Soup
  { mainRecipeID: 2, sideRecipeID: 4 }, // Risotto pairs with Caesar Salad
  { mainRecipeID: 5, sideRecipeID: 4 }, // Salmon pairs with Caesar Salad
  { mainRecipeID: 1, sideRecipeID: 3 }, // Steak pairs with Lava Cake (dessert)
  { mainRecipeID: 2, sideRecipeID: 7 }, // Risotto pairs with Tiramisu
  { mainRecipeID: 5, sideRecipeID: 3 }, // Salmon pairs with Lava Cake
];

// TypeOf junction table mock data (Recipe-Cuisine relationship)
export const typeOf = [
  { cuisineID: 4, recipeID: 1 }, // Beef Steak - American
  { cuisineID: 1, recipeID: 2 }, // Risotto - Italian
  { cuisineID: 2, recipeID: 3 }, // Lava Cake - French
  { cuisineID: 4, recipeID: 4 }, // Caesar Salad - American
  { cuisineID: 3, recipeID: 5 }, // Miso Salmon - Japanese
  { cuisineID: 2, recipeID: 6 }, // French Onion Soup - French
  { cuisineID: 1, recipeID: 7 }, // Tiramisu - Italian
  { cuisineID: 2, recipeID: 8 }, // Lobster Bisque - French
];

// UsingIngredients junction table mock data
export const usingIngredients = [
  { ingredientID: 1, recipeID: 1, quantity: 2 }, // Steak needs ribeye
  { ingredientID: 15, recipeID: 1, quantity: 4 }, // Steak needs butter
  { ingredientID: 16, recipeID: 1, quantity: 3 }, // Steak needs garlic
  { ingredientID: 2, recipeID: 2, quantity: 2 }, // Risotto needs arborio rice
  { ingredientID: 3, recipeID: 2, quantity: 1 }, // Risotto needs truffle
  { ingredientID: 14, recipeID: 2, quantity: 1 }, // Risotto needs parmesan
  { ingredientID: 15, recipeID: 2, quantity: 3 }, // Risotto needs butter
  { ingredientID: 4, recipeID: 3, quantity: 200 }, // Lava cake needs chocolate (grams)
  { ingredientID: 15, recipeID: 3, quantity: 100 }, // Lava cake needs butter
  { ingredientID: 18, recipeID: 3, quantity: 2 }, // Lava cake needs eggs
  { ingredientID: 5, recipeID: 4, quantity: 1 }, // Caesar needs romaine
  { ingredientID: 14, recipeID: 4, quantity: 50 }, // Caesar needs parmesan
  { ingredientID: 16, recipeID: 4, quantity: 2 }, // Caesar needs garlic
  { ingredientID: 6, recipeID: 5, quantity: 2 }, // Salmon recipe needs salmon
  { ingredientID: 7, recipeID: 5, quantity: 3 }, // Salmon needs miso
  { ingredientID: 8, recipeID: 6, quantity: 4 }, // French onion needs onions
  { ingredientID: 9, recipeID: 6, quantity: 200 }, // French onion needs gruyere
  { ingredientID: 10, recipeID: 7, quantity: 500 }, // Tiramisu needs mascarpone
  { ingredientID: 11, recipeID: 7, quantity: 24 }, // Tiramisu needs ladyfingers
  { ingredientID: 12, recipeID: 8, quantity: 2 }, // Bisque needs lobster
  { ingredientID: 13, recipeID: 8, quantity: 2 }, // Bisque needs cream
];

// UsingEquip junction table mock data
export const usingEquip = [
  { recipeID: 1, equipmentID: 1 }, // Steak uses cast iron
  { recipeID: 1, equipmentID: 2 }, // Steak uses knife
  { recipeID: 1, equipmentID: 10 }, // Steak uses tongs
  { recipeID: 2, equipmentID: 6 }, // Risotto uses stock pot
  { recipeID: 2, equipmentID: 8 }, // Risotto uses whisk
  { recipeID: 3, equipmentID: 5 }, // Lava cake uses ramekins
  { recipeID: 3, equipmentID: 8 }, // Lava cake uses whisk
  { recipeID: 4, equipmentID: 2 }, // Caesar uses knife
  { recipeID: 4, equipmentID: 9 }, // Caesar uses cutting board
  { recipeID: 5, equipmentID: 1 }, // Salmon uses cast iron
  { recipeID: 6, equipmentID: 3 }, // Soup uses dutch oven
  { recipeID: 6, equipmentID: 2 }, // Soup uses knife
  { recipeID: 7, equipmentID: 8 }, // Tiramisu uses whisk
  { recipeID: 8, equipmentID: 6 }, // Bisque uses stock pot
  { recipeID: 8, equipmentID: 7 }, // Bisque uses immersion blender
];

// SoldBy junction table mock data (Ingredient prices at stores)
export const soldBy = [
  { ingredientID: 1, storeID: 1, price: 24.99 },
  { ingredientID: 1, storeID: 3, price: 28.99 },
  { ingredientID: 1, storeID: 5, price: 26.99 },
  { ingredientID: 2, storeID: 1, price: 6.99 },
  { ingredientID: 2, storeID: 2, price: 4.99 },
  { ingredientID: 2, storeID: 4, price: 5.49 },
  { ingredientID: 3, storeID: 1, price: 89.99 },
  { ingredientID: 3, storeID: 3, price: 95.99 },
  { ingredientID: 4, storeID: 1, price: 8.99 },
  { ingredientID: 4, storeID: 2, price: 6.99 },
  { ingredientID: 4, storeID: 4, price: 7.49 },
  { ingredientID: 5, storeID: 1, price: 3.99 },
  { ingredientID: 5, storeID: 2, price: 2.99 },
  { ingredientID: 5, storeID: 4, price: 3.49 },
  { ingredientID: 6, storeID: 1, price: 14.99 },
  { ingredientID: 6, storeID: 3, price: 16.99 },
  { ingredientID: 6, storeID: 5, price: 15.99 },
  { ingredientID: 7, storeID: 1, price: 7.99 },
  { ingredientID: 7, storeID: 2, price: 5.99 },
  { ingredientID: 8, storeID: 1, price: 2.99 },
  { ingredientID: 8, storeID: 2, price: 1.99 },
  { ingredientID: 8, storeID: 4, price: 2.49 },
  { ingredientID: 9, storeID: 1, price: 12.99 },
  { ingredientID: 9, storeID: 3, price: 14.99 },
  { ingredientID: 10, storeID: 1, price: 8.99 },
  { ingredientID: 10, storeID: 3, price: 9.99 },
  { ingredientID: 11, storeID: 1, price: 5.99 },
  { ingredientID: 11, storeID: 2, price: 4.99 },
  { ingredientID: 12, storeID: 1, price: 34.99 },
  { ingredientID: 12, storeID: 3, price: 39.99 },
  { ingredientID: 12, storeID: 5, price: 36.99 },
  { ingredientID: 13, storeID: 1, price: 5.99 },
  { ingredientID: 13, storeID: 2, price: 4.49 },
  { ingredientID: 13, storeID: 4, price: 4.99 },
  { ingredientID: 14, storeID: 1, price: 11.99 },
  { ingredientID: 14, storeID: 2, price: 8.99 },
  { ingredientID: 14, storeID: 3, price: 13.99 },
  { ingredientID: 15, storeID: 1, price: 6.99 },
  { ingredientID: 15, storeID: 2, price: 4.99 },
  { ingredientID: 15, storeID: 4, price: 5.49 },
  { ingredientID: 16, storeID: 1, price: 1.99 },
  { ingredientID: 16, storeID: 2, price: 0.99 },
  { ingredientID: 16, storeID: 4, price: 1.49 },
  { ingredientID: 17, storeID: 1, price: 12.99 },
  { ingredientID: 17, storeID: 2, price: 8.99 },
  { ingredientID: 17, storeID: 3, price: 14.99 },
  { ingredientID: 18, storeID: 1, price: 5.99 },
  { ingredientID: 18, storeID: 2, price: 3.99 },
  { ingredientID: 18, storeID: 4, price: 4.49 },
];

// Substitutes junction table mock data
export const substitutes = [
  { ingredientID: 1, substituteID: 6 }, // Ribeye can substitute with Salmon (protein)
  { ingredientID: 9, substituteID: 14 }, // Gruyere can substitute with Parmesan
  { ingredientID: 13, substituteID: 10 }, // Heavy cream can substitute with Mascarpone
  { ingredientID: 15, substituteID: 17 }, // Butter can substitute with Olive Oil
  { ingredientID: 2, substituteID: 2 }, // This shouldn't happen per CHECK constraint
];

// Helper functions to get related data (simulating JOIN operations)
export const getRecipeWithDetails = (recipeID) => {
  const recipe = recipes.find(r => r.recipeID === recipeID);
  if (!recipe) return null;

  const author = users.find(u => u.userID === recipe.authorID);
  const recipeIngredients = usingIngredients
    .filter(ui => ui.recipeID === recipeID)
    .map(ui => ({
      ...ingredients.find(i => i.ingredientsID === ui.ingredientID),
      quantity: ui.quantity
    }));
  const recipeEquipment = usingEquip
    .filter(ue => ue.recipeID === recipeID)
    .map(ue => equipment.find(e => e.equipID === ue.equipmentID));
  const recipeCuisines = typeOf
    .filter(t => t.recipeID === recipeID)
    .map(t => cuisines.find(c => c.cuisineID === t.cuisineID));
  const ratings = hasEaten.filter(h => h.recipeID === recipeID);
  const avgRating = ratings.length > 0 
    ? ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length 
    : 0;
  const pairings = bestPairsWith
    .filter(b => b.mainRecipeID === recipeID)
    .map(b => recipes.find(r => r.recipeID === b.sideRecipeID));

  return {
    ...recipe,
    author,
    ingredients: recipeIngredients,
    equipment: recipeEquipment,
    cuisines: recipeCuisines,
    avgRating,
    numReviews: ratings.length,
    pairings
  };
};

export const getRestaurantWithMenu = (restID) => {
  const restaurant = restaurants.find(r => r.restID === restID);
  if (!restaurant) return null;

  const menu = cooks
    .filter(c => c.restaurantID === restID)
    .map(c => ({
      ...recipes.find(r => r.recipeID === c.recipeID),
      costOfItem: c.costOfItem
    }));

  return { ...restaurant, menu };
};

export const getUserWithHistory = (userID) => {
  const user = users.find(u => u.userID === userID);
  if (!user) return null;

  const history = hasEaten
    .filter(h => h.userID === userID)
    .map(h => ({
      ...recipes.find(r => r.recipeID === h.recipeID),
      favorites: h.favorites,
      stars: h.stars
    }));

  const favorites = history.filter(h => h.favorites);

  return { ...user, history, favorites };
};

export const getIngredientWithPrices = (ingredientID) => {
  const ingredient = ingredients.find(i => i.ingredientsID === ingredientID);
  if (!ingredient) return null;

  const prices = soldBy
    .filter(s => s.ingredientID === ingredientID)
    .map(s => ({
      ...groceryStores.find(g => g.storeID === s.storeID),
      price: s.price
    }));

  const subs = substitutes
    .filter(s => s.ingredientID === ingredientID && s.ingredientID !== s.substituteID)
    .map(s => ingredients.find(i => i.ingredientsID === s.substituteID));

  return { ...ingredient, prices, substitutes: subs };
};

export const getStoreWithInventory = (storeID) => {
  const store = groceryStores.find(g => g.storeID === storeID);
  if (!store) return null;

  const inventory = soldBy
    .filter(s => s.storeID === storeID)
    .map(s => ({
      ...ingredients.find(i => i.ingredientsID === s.ingredientID),
      price: s.price
    }));

  return { ...store, inventory };
};

// Current logged in user (placeholder for auth)
export const currentUser = users[0];
