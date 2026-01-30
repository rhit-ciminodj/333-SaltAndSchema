import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Base64;
import java.util.Random;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.swing.JOptionPane;

public class UserLogin {

    private ConnectionMain dbService = null;
	private static final Random RANDOM = new SecureRandom();
	private static final Base64.Encoder enc = Base64.getEncoder();
	private static final Base64.Decoder dec = Base64.getDecoder();
    
    public UserLogin(ConnectionMain dbService) {
        this.dbService = dbService;
    }


    public boolean login(String username, String password) {
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call GetCredentials(?,?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setString(2, username);
			stmt.setString(3, null);
			stmt.setString(4, null);

			try(ResultSet rs = stmt.executeQuery()){
				if(rs.next()) {
					String salt = rs.getString("PasswordSalt");
					String pwd = rs.getString("PasswordHash");
					
					String hashInput = hashPassword(dec.decode(salt), password);
					String hashpw = hashPassword(dec.decode(salt), password);
					if(hashInput.equals(hashpw)) {
						return true;
					} else {
						JOptionPane.showMessageDialog(null, "Incorrect Password");
						return false;
					}
				}
			} catch (SQLException e) {
				JOptionPane.showMessageDialog(null, "Login Failed");
				e.printStackTrace();
				return false;
			}
		} catch (SQLException e) {
			JOptionPane.showMessageDialog(null, "Login Failed");
			e.printStackTrace();
			return false;
		}
		return false;
	}

    public boolean register(String username, String password) {
		byte[] data = getNewSalt();
		String salt = getStringFromBytes(data);
		String hash = hashPassword(getNewSalt(), password);
		
		
		try {
			CallableStatement stmt;
			stmt = dbService.getConnection().prepareCall("{? = call Register(?,?,?)}");
			stmt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmt.setString(2, username);
			stmt.setString(3, salt);
			stmt.setString(4, hash); 

			stmt.execute();
			return true;
		} catch (SQLException e) {
			if(e.getErrorCode() == 51001) {
				JOptionPane.showMessageDialog(null, "Registration Failed");
			}
			if(e.getErrorCode() == 51002) {
				JOptionPane.showMessageDialog(null, "Registration Failed");
			}
			if(e.getErrorCode() == 51003) {
				JOptionPane.showMessageDialog(null, "Registration Failed");
			}
			if(e.getErrorCode() == 51004) {
				JOptionPane.showMessageDialog(null, "Registration Failed");
			}
			e.printStackTrace();
			return false;
		}
	}
	
	public byte[] getNewSalt() {
		byte[] salt = new byte[16];
		RANDOM.nextBytes(salt);
		return salt;
	}
	
	public String getStringFromBytes(byte[] data) {
		return enc.encodeToString(data);
	}

	public String hashPassword(byte[] salt, String password) {

		KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 65536, 128);
		SecretKeyFactory f;
		byte[] hash = null;
		try {
			f = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
			hash = f.generateSecret(spec).getEncoded();
		} catch (NoSuchAlgorithmException e) {
			JOptionPane.showMessageDialog(null, "An error occurred during password hashing. See stack trace.");
			e.printStackTrace();
		} catch (InvalidKeySpecException e) {
			JOptionPane.showMessageDialog(null, "An error occurred during password hashing. See stack trace.");
			e.printStackTrace();
		}
		return getStringFromBytes(hash);
	}
}
