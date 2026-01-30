import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

// public class Main {
//     private static String serverUsername = null;
// 	private static String serverPassword = null;
// 	private static ConnectionMain dbService = null;

//     public static void main(String[] args) {
// 		Properties prop = new Properties();
// 		ClassLoader loader = Thread.currentThread().getContextClassLoader();           
// 		try (InputStream stream = loader.getResourceAsStream("importApplication/saltandschema.properties")) {
//             try {
//             	prop.load(stream);
//             } catch(IOException e) {
//             	e.printStackTrace();
//             }
//         } catch (IOException e) {
//             e.printStackTrace();
//         }
// 		serverUsername = prop.getProperty("serverUsername");
//         serverPassword = prop.getProperty("serverPassword");
// 		dbService = new ConnectionMain(prop.getProperty("serverName"), prop.getProperty("DatabaseName"));
//         System.out.println((dbService.connect(prop.getProperty("serverUsername"), prop.getProperty("serverPassword"))));
// 	}
// }
public class Main {
	private static String serverUsername = null;
	private static String serverPassword = null;
	private static ConnectionMain dbService = null;
	

	public static void main(String[] args) {

		Properties props = loadProperties();
		serverUsername = props.getProperty("serverUsername");
		serverPassword = props.getProperty("serverPassword");
		dbService = new ConnectionMain(props.getProperty("serverName"), props.getProperty("databaseName"));
		

			

		if (dbService.connect(serverUsername, serverPassword)) {
			System.out.println("Connection Established");
			Importer importer = new Importer(dbService);
			importer.Import();
			dbService.closeConnection();
			System.out.println("finished imports");
		} else {
			System.out.println("Connection could not be made");
			System.exit(1);
		}

	}


	public static Properties loadProperties() {
		String binDir = System.getProperty("user.dir");
		FileInputStream fis = null;
		Properties props = new Properties();
		try {
			fis = new FileInputStream(binDir + "/importApplication/saltandschema.properties");
			props.load(fis);
		} catch (FileNotFoundException e) {
			System.out.println("template.properties file not found");
			e.printStackTrace();
			System.exit(1);
		} catch (IOException e) {
			System.out.println("template.properties file could not be opened");
			e.printStackTrace();
			System.exit(1);
		}
		finally {
			if (fis!=null) {
				try {
					fis.close();
				} catch (IOException e) {
					System.out.println("Input Stream could not be closed.");
					e.printStackTrace();
				}
			}
		}
		return props;
	}

}

