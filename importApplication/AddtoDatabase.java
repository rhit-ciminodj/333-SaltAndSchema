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
			if(e.getErrorCode() == 54001) {
				e.printStackTrace();
			}
			if(e.getErrorCode() == 54002) {
				JOptionPane.showMessageDialog(null, "Restaurant name already exists.");
			}
			e.printStackTrace();
			return false;
		}
    }

}
