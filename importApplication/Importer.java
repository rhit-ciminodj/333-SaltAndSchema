import java.io.FileReader;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

public class Importer {
    ConnectionMain dbService = null;
    AddtoDatabase dbAdder = null;
    
    

    public Importer(ConnectionMain dbService) {
        this.dbService = dbService;
        this.dbAdder = new AddtoDatabase(dbService);
        System.out.println("Made importer");
    }

    public void Import() {
        try {
            Gson gson = new Gson();
            FileReader reader = new FileReader("resources/data.json");
            JsonObject data = gson.fromJson(reader, JsonObject.class);
            reader.close();
            System.out.println("Begin Imports");

            importPeople(data.getAsJsonArray("people"));
            importCuisineTypes(data.getAsJsonArray("cuisine_types"));
            importKitchenTools(data.getAsJsonArray("kitchen_tools"));
            importIngredients(data.getAsJsonArray("food_items"));
            importStores(data.getAsJsonArray("stores"));
            importRestaurants(data.getAsJsonArray("restaurants"));
            importDishes(data.getAsJsonArray("dishes"));
            importIngredientSubstitutions(data.getAsJsonArray("ingredient_substitutions"));
            importRecipeIngredients(data.getAsJsonArray("recipe_ingredients"));
            importRecipeTools(data.getAsJsonArray("recipe_tools"));
            importDishCuisines(data.getAsJsonArray("dish_cuisines"));
            // importRestaurantMenu(data.getAsJsonArray("restaurant_menu"));
            importUserRatings(data.getAsJsonArray("user_ratings"));
            importStoreInventory(data.getAsJsonArray("store_inventory"));
            importDishPairings(data.getAsJsonArray("dish_pairings"));

            System.out.println("Data import completed successfully!");
        } catch (Exception e) {
            System.err.println("Error importing data: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private void importPeople(JsonArray people) {
        for (JsonElement element : people) {
            JsonObject person = element.getAsJsonObject();
            String username = person.get("username").getAsString();
            String street = person.get("street").getAsString();
            String city = person.get("city").getAsString();
            String state = person.get("state").getAsString();
            String zipcode = person.get("zip").getAsString();
            String address = street + " " + city + ", " + state + " " + zipcode;
            dbAdder.newUser(username, address);
            System.out.println("Added user: " + username);
        }
        System.out.println("\nAdded all users\n");
    }

    private void importCuisineTypes(JsonArray cuisines) {
        for (JsonElement element : cuisines) {
            JsonObject cuisine = element.getAsJsonObject();
            String cuisineName = cuisine.get("cuisine_name").getAsString();
            String desc = cuisine.get("info").getAsString();
            dbAdder.newCuisine(cuisineName, desc);
            System.out.println("Added cuisine: " + cuisineName);
        }
        System.out.println("\nAdded all \n");
    }

    private void importKitchenTools(JsonArray tools) {
        for (JsonElement element : tools) {
            JsonObject tool = element.getAsJsonObject();
            String toolName = tool.get("tool_name").getAsString();
            String desc = tool.get("description").getAsString();
            dbAdder.newEquipment(toolName, desc);
            System.out.println("Added equipment: " + toolName);
        }
        System.out.println("\nAdded all equipment\n");
    }

    private void importIngredients(JsonArray items) {
        for (JsonElement element : items) {
            JsonObject item = element.getAsJsonObject();
            String itemName = item.get("item_name").getAsString();
            String desc = item.get("notes").getAsString();
            dbAdder.addIngredient(itemName, desc);
            System.out.println("Processing ingredient: " + itemName);
        }
        System.out.println("\nAdded all Foods\n");
    }

    private void importStores(JsonArray stores) {
        for (JsonElement element : stores) {
            JsonObject store = element.getAsJsonObject();
            String storeName = store.get("store_name").getAsString();
            String storeLocation = store.get("store_location").getAsString();
            dbAdder.newGroceryStore(storeName, storeLocation);
            System.out.println("Added store: " + storeName);
        }
    }

    private void importRestaurants(JsonArray restaurants) {
        for (JsonElement element : restaurants) {
            JsonObject restaurant = element.getAsJsonObject();
            String name = restaurant.get("name").getAsString();
            String location = restaurant.get("location").getAsString();
            Double rating = restaurant.get("rating_stars").getAsDouble();
            dbAdder.newRestaurant(name, rating, location);
            System.out.println("Added restaurant: " + name);
        }
    }

    private void importDishes(JsonArray dishes) {
        for (JsonElement element : dishes) {
            JsonObject dish = element.getAsJsonObject();
            String dishName = dish.get("dish").getAsString();
            int servings = dish.get("serves").getAsInt();
            String author = null;
            if(!dish.get("creator_username").isJsonNull()){
                author = dish.get("creator_username").getAsString();
            }
            String restName = null;
            if(!dish.get("restaurant_name").isJsonNull()){
                restName = dish.get("restaurant_name").getAsString();
            }
            String type = dish.get("category").getAsString();
            int calorie = dish.get("calorie_count").getAsInt();
            String summary = dish.get("summary").getAsString();
            int minutes = dish.get("cook_minutes").getAsInt();
            String steps = dish.get("steps").getAsString();

            dbAdder.newRecipe(dishName, servings, author, restName, type, calorie, summary, minutes, steps);
            System.out.println("Added recipe: " + dishName);
        }
    }

    // String RecipeName, int ServingSize, String UserAuthor,int RestaurantAuthorID, String TypeOfDish,
		//  int Calories,String Description, int TimeToCook, String Instructions

    private void importIngredientSubstitutions(JsonArray substitutions) {
        for (JsonElement element : substitutions) {
            JsonObject sub = element.getAsJsonObject();
            String ingredient = sub.get("ingredient").getAsString();
            String substitute = sub.get("can_substitute").getAsString();
            // Link substitutes - requires ingredient IDs from database
            System.out.println("Processing substitution: " + ingredient + " -> " + substitute);
        }
    }

    private void importRecipeIngredients(JsonArray recipeIngredients) {
        for (JsonElement element : recipeIngredients) {
            JsonObject ri = element.getAsJsonObject();
            String dishName = ri.get("dish").getAsString();
            String ingredientName = ri.get("ingredient").getAsString();
            String amount = ri.get("amount").getAsString();
            // Link recipe to ingredient - requires IDs from database
            System.out.println("Processing recipe ingredient: " + dishName + " - " + ingredientName);
        }
    }

    private void importRecipeTools(JsonArray recipeTools) {
        for (JsonElement element : recipeTools) {
            JsonObject rt = element.getAsJsonObject();
            String dishName = rt.get("dish").getAsString();
            String toolName = rt.get("tool").getAsString();
            // Link recipe to tool - requires IDs from database
            System.out.println("Processing recipe tool: " + dishName + " - " + toolName);
        }
    }

    private void importDishCuisines(JsonArray dishCuisines) {
        for (JsonElement element : dishCuisines) {
            JsonObject dc = element.getAsJsonObject();
            String dishName = dc.get("dish").getAsString();
            String cuisineName = dc.get("cuisine").getAsString();
            // Link dish to cuisine - requires IDs from database
            System.out.println("Processing dish cuisine: " + dishName + " - " + cuisineName);
        }
    }

    // private void importRestaurantMenu(JsonArray menu) {
    //     for (JsonElement element : menu) {
    //         JsonObject m = element.getAsJsonObject();
    //         String restaurantName = m.get("restaurant").getAsString();
    //         String dishName = m.get("dish").getAsString();
    //         String price = m.get("menu_price").getAsString();
    //         // Link restaurant to recipe - requires IDs from database
    //         System.out.println("Processing menu item: " + restaurantName + " - " + dishName + " - " + price);
    //     }
    // }

    private void importUserRatings(JsonArray ratings) {
        for (JsonElement element : ratings) {
            JsonObject rating = element.getAsJsonObject();
            String username = rating.get("username").getAsString();
            String dishName = rating.get("dish").getAsString();
            int ratingValue = rating.getAsJsonPrimitive("rating").getAsInt();
            // Link user to recipe with rating - requires IDs from database
            System.out.println("Processing rating: " + username + " rated " + dishName + " as " + ratingValue);
        }
    }

    private void importStoreInventory(JsonArray inventory) {
        for (JsonElement element : inventory) {
            JsonObject item = element.getAsJsonObject();
            String storeName = item.get("store").getAsString();
            String ingredientName = item.get("ingredient").getAsString();
            String price = item.get("price_per_unit").getAsString();
            // Link store to ingredient - requires IDs from database
            System.out.println("Processing inventory: " + storeName + " - " + ingredientName + " - " + price);
        }
    }

    private void importDishPairings(JsonArray pairings) {
        for (JsonElement element : pairings) {
            JsonObject pairing = element.getAsJsonObject();
            String mainDish = pairing.get("main_dish").getAsString();
            String pairedDish = pairing.get("pairs_with").getAsString();
            // Link dish pairings - requires IDs from database
            System.out.println("Processing dish pairing: " + mainDish + " pairs with " + pairedDish);
        }
    }

}