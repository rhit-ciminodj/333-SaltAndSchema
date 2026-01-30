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
	public Boolean changeAddress(int RestaurantID, String newAddress) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call changeAddress(?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setInt(2, RestaurantID);
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
	public Boolean changePriceOfItem(int MenuItemID, double newPrice) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call changePriceOfItem(?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setInt(2, MenuItemID);
			stmt.setDouble(3, newPrice);

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
	public Boolean linkRecipeToRestaurant(int RecipeID, int RestaurantID) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call linkRecipeToRestaurant(?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setInt(2, RecipeID);
			stmt.setInt(3, RestaurantID);

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
	public Boolean newCuisine(String CuisineName) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call newCuisine(?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setString(2, CuisineName);

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
	public Boolean newEquipment(String EquipmentName) {	
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call newEquipment(?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setString(2, EquipmentName);

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
