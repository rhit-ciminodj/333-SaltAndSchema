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

}
