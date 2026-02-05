import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.swing.JOptionPane;



public class AddtoDatabase {

    private ConnectionMain dbService = null;

    public AddtoDatabase(ConnectionMain dbService) {
        this.dbService = dbService;
    }


    public Boolean addCuisineToRecipe(int CuisineID, int RecipeID) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call addCuisineToRecipe(?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setInt(2, CuisineID);
			stmt.setInt(3, RecipeID);

			stmt.execute();
			return true;
		} catch (SQLException e) {
			if(e.getErrorCode() == 51021) {
				e.printStackTrace();
			}
			if(e.getErrorCode() == 51022) {
				JOptionPane.showMessageDialog(null, "Restaurant name already exists.");
			}
			e.printStackTrace();
			return false;
		}
    }

    public Boolean addEquipToRecipe(int RecipeID, int EquipmentID) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call addEquipToRecipe(?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setInt(2, RecipeID);
			stmt.setInt(3, EquipmentID);

			stmt.execute();
			return true;
		} catch (SQLException e) {
			if(e.getErrorCode() == 51021) {
				e.printStackTrace();
			}
			if(e.getErrorCode() == 51022) {
				e.printStackTrace();
			}
			e.printStackTrace();
			return false;
		}
    }


    public Boolean addIngredientToRecipe(int IngredientID, int RecipeID, int Quantity) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call addIngredientToRecipe(?,?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setInt(2, IngredientID);
			stmt.setInt(3, RecipeID);
            stmt.setInt(4, Quantity);

			stmt.execute();
			return true;
		} catch (SQLException e) {
			if(e.getErrorCode() == 51021) {
				e.printStackTrace();
			}
			if(e.getErrorCode() == 51022) {
				e.printStackTrace();
			}
			e.printStackTrace();
			return false;
		}
    }
	public Boolean addSubstituteToIngredient(int IngredientID, int SubstituteID) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call addSubstituteToIngredient(?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setInt(2, IngredientID);
			stmt.setInt(3, SubstituteID);

			stmt.execute();
			return true;
		} catch (SQLException e) {
			if(e.getErrorCode() == 51021) {
				e.printStackTrace();
			}
			if(e.getErrorCode() == 51022) {
				e.printStackTrace();
			}
			e.printStackTrace();
			return false;
		}
	}
	public Boolean changeAddress(int userID, String newAddress) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call changeAddress(?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setInt(2, userID);
			stmt.setString(3, newAddress);

			stmt.execute();
			return true;
		} catch (SQLException e) {
			if(e.getErrorCode() == 51021) {
				e.printStackTrace();
			}
			if(e.getErrorCode() == 51022) {
				e.printStackTrace();
			}
			e.printStackTrace();
			return false;
		}
	}
	public Boolean changePriceOfItem(int RestaurantID,int RecipeID, double newCost) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call changePriceOfItem(?,?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setInt(2, RestaurantID);
			stmt.setInt(3, RecipeID);
			stmt.setDouble(4, newCost);		

			stmt.execute();
			return true;
		} catch (SQLException e) {
			if(e.getErrorCode() == 51021) {
				e.printStackTrace();
			}
			if(e.getErrorCode() == 51022) {
				e.printStackTrace();
			}
			e.printStackTrace();
			return false;
		}
	}
	public Boolean changeUsername(int UserID, String newUsername) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call changeUsername(?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setInt(2, UserID);
			stmt.setString(3, newUsername);

			stmt.execute();
			return true;
		} catch (SQLException e) {
			if(e.getErrorCode() == 51021) {
				e.printStackTrace();
			}
			if(e.getErrorCode() == 51022) {
				e.printStackTrace();
			}
			e.printStackTrace();
			return false;
		}
	}
	public Boolean DeleteUser(int UserID) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call DeleteUser(?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setInt(2, UserID);

			stmt.execute();
			return true;
		} catch (SQLException e) {
			if(e.getErrorCode() == 51021) {
				e.printStackTrace();
			}
			if(e.getErrorCode() == 51022) {
				e.printStackTrace();
			}
			e.printStackTrace();
			return false;
		}
	}
	public Boolean getRecipeStars(int RecipeID, double newStars) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call getRecipeStars(?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setInt(2, RecipeID);
			stmt.setDouble(3, newStars);

			stmt.execute();
			return true;
		} catch (SQLException e) {
			if(e.getErrorCode() == 51021) {
				e.printStackTrace();
			}
			if(e.getErrorCode() == 51022) {
				e.printStackTrace();
			}
			e.printStackTrace();
			return false;
		}
	}
	public Boolean linkRecipeToRestaurant(int RestID, int RecipeID, double money) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("	{? = call linkRecipeToRestaurant(?,?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);	
			stmt.setInt(2, RestID);
			stmt.setInt(3, RecipeID);
			stmt.setDouble(4, money);

			stmt.execute();
			return true;
		} catch (SQLException e) {
			if(e.getErrorCode() == 51021) {
				e.printStackTrace();
			}
			if(e.getErrorCode() == 51022) {
				e.printStackTrace();
			}
			e.printStackTrace();
			return false;
		}
	}
	public Boolean newCuisine(String CuisineName, String Description) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call newCuisine(?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setString(2, CuisineName);
			stmt.setString(3, Description);

			stmt.execute();
			return true;
		} catch (SQLException e) {
			if(e.getErrorCode() == 51021) {
				e.printStackTrace();
			}
			if(e.getErrorCode() == 51022) {
				JOptionPane.showMessageDialog(null, "Cuisine name already exists.");
			}
			e.printStackTrace();
			return false;
		}
	}
	public Boolean newEquipment(String EquipmentName, String Description) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call newEquipment(?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setString(2, EquipmentName);
			stmt.setString(3, Description);
			stmt.execute();
			return true;
		} catch (SQLException e) {
			if(e.getErrorCode() == 51021) {
				e.printStackTrace();
			}
			if(e.getErrorCode() == 51022) {
				JOptionPane.showMessageDialog(null, "Equipment name already exists.");
			}
			e.printStackTrace();
			return false;
		}
	}
	public Boolean newGroceryStore(String StoreName, String Location) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call newGroceryStore(?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setString(2, StoreName);
			stmt.setString(3, Location);

			stmt.execute();
			return true;
		} catch (SQLException e) {
			if(e.getErrorCode() == 51021) {
				e.printStackTrace();
			}
			if(e.getErrorCode() == 51022) {
				JOptionPane.showMessageDialog(null, "Grocery Store name already exists.");
			}
			e.printStackTrace();
			return false;
		}
	}
	public Boolean newPair(int MainID, int SideID) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call newPair(?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setInt(2, MainID);
			stmt.setInt(3, SideID);

			stmt.execute();
			return true;
		} catch (SQLException e) {
			if(e.getErrorCode() == 51021) {
				e.printStackTrace();
			}
			if(e.getErrorCode() == 51022) {
				JOptionPane.showMessageDialog(null, "Ingredient Pair already exists.");
			}
			e.printStackTrace();
			return false;
		}
	}
	public Boolean newRecipe(String RecipeName, int ServingSize, String UserAuthor, String TypeOfDish,
		 int Calories,String Description, int TimeToCook, String Instructions) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call newRecipe(?,?,?,?,?,?,?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setString(2, RecipeName);
			stmt.setInt(3, ServingSize);
			stmt.setString(4, UserAuthor);
			stmt.setString(5, TypeOfDish);
			stmt.setInt(6, Calories);
			stmt.setString(7, Description);
			stmt.setInt(8, TimeToCook);
			stmt.setString(9, Instructions);

			stmt.execute();
			return true;
		} catch (SQLException e) {
			if(e.getErrorCode() == 51021) {
				e.printStackTrace();
			}
			if(e.getErrorCode() == 51022) {
				JOptionPane.showMessageDialog(null, "Recipe name already exists.");
			}
			e.printStackTrace();
			return false;
		}
	}
	public Boolean newRestaurant(String RestaurantName, double rating, String Address) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call newRestaurant(?,?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setString(2, RestaurantName);
			stmt.setDouble(3, rating);
			stmt.setString(4, Address);

			stmt.execute();
			return true;
		} catch (SQLException e) {
			if(e.getErrorCode() == 51021) {
				e.printStackTrace();
			}
			if(e.getErrorCode() == 51022) {
				JOptionPane.showMessageDialog(null, "Restaurant name already exists.");
			}
			e.printStackTrace();
			return false;
		}
	}
	public Boolean newUser(String Username, String Address) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call newUser(?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setString(2, Username);
			stmt.setString(3, Address);

			stmt.execute();
			return true;
		} catch (SQLException e) {
			if(e.getErrorCode() == 51021) {
				e.printStackTrace();
			}
			if(e.getErrorCode() == 51022) {
				JOptionPane.showMessageDialog(null, "Username already exists.");
			}
			e.printStackTrace();
			return false;
		}
	}
	public Boolean addIngredient(String name, String description) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call newIngredient(?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setString(2, name);
			stmt.setString(3, description);

			stmt.execute();
			return true;
		} catch (SQLException e) {
			if(e.getErrorCode() == 51021) {
				e.printStackTrace();
			}
			if(e.getErrorCode() == 51022) {
				JOptionPane.showMessageDialog(null, "Ingredient already exists.");
			}
			e.printStackTrace();
			return false;
		}
	}
	public Boolean soldByStore(int IngredientID, int StoreID, double money) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call soldByStore(?,?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setInt(2, IngredientID);
			stmt.setInt(3, StoreID);
			stmt.setDouble(4, money);

			stmt.execute();
			return true;
		} catch (SQLException e) {
			if(e.getErrorCode() == 51021) {
				e.printStackTrace();
			}
			if(e.getErrorCode() == 51022) {
				JOptionPane.showMessageDialog(null, "Ingredient is already sold by this store.");
			}
			e.printStackTrace();
			return false;
		}
	}
	public boolean updateRecipe(int recipeID, int ServingSize, String typeOfDish, int Calories, String Description, int timeToCook, String Instruction){
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call updateRecipe(?,?,?,?,?,?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setInt(2, recipeID);
			stmt.setInt(3, ServingSize);
			stmt.setString(4, typeOfDish);
			stmt.setInt(5, Calories);
			stmt.setString(6, Description);
			stmt.setInt(7, timeToCook);
			stmt.setString(8, Instruction);

			stmt.execute();
			return true;
		} catch (SQLException e) {
			if(e.getErrorCode() == 51021) {
				e.printStackTrace();
			}
			if(e.getErrorCode() == 51022) {
				e.printStackTrace();
			}
			e.printStackTrace();
			return false;
		}
	}
	public Boolean userHasEaten(int UserID, int RecipeID, int Favorites, int Stars) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call userHasEaten(?,?,?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setInt(2, UserID);
			stmt.setInt(3, RecipeID);
			stmt.setInt(4, Favorites);
			stmt.setInt(5, Stars);

			stmt.execute();
			return true;
		} catch (SQLException e) {
			if(e.getErrorCode() == 51021) {
				e.printStackTrace();
			}
			if(e.getErrorCode() == 51022) {
				JOptionPane.showMessageDialog(null, "Record already exists.");
			}
			e.printStackTrace();
			return false;
		}
	}
}
