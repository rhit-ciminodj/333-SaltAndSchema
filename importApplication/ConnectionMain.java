import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class ConnectionMain {

	private final String url = "jdbc:sqlserver://${dbServer};databaseName=${dbName};user=${user};password={${pass}};encrypt=false;";

	private Connection connection = null;

	private String databaseName;
	private String serverName;

	public ConnectionMain(String serverName, String databaseName) {
		this.serverName = serverName;
		this.databaseName = databaseName;
	}


	public boolean connect(String user, String pass) {
		String fullUrl = url
            .replace("${dbServer}", this.serverName)
            .replace("${dbName}", this.databaseName)
            .replace("${user}", user)
            .replace("${pass}", pass);

		try {
			this.connection = DriverManager.getConnection(fullUrl);
			return true;
		} catch (SQLException e) {
			return false;
		}
	}
	

	public Connection getConnection() {
		return this.connection;
	}
	
	public void closeConnection() {
		try {
            if (this.connection != null && !this.connection.isClosed()) {
                connection.close();
            }
        } catch (SQLException e) {
            System.err.println("Error closing connection: " + e.getMessage());
        }
	}
		


};