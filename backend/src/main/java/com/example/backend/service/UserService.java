package com.example.backend.service;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

import java.sql.Types;

import com.example.backend.entity.User;
import com.example.backend.entity.UserAuth;

@Service
public class UserService {


	private static final Random RANDOM = new SecureRandom();
	private static final Base64.Encoder enc = Base64.getEncoder();
	private static final Base64.Decoder dec = Base64.getDecoder();

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserService(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<User> getAllUsers() {
        String sql = "SELECT UserID, Username, Address FROM Users";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            User user = new User();
            user.setUserId(rs.getInt("UserID"));
            user.setUsername(rs.getString("Username"));
            user.setAddress(rs.getString("Address"));
            return user;
        });
    }

    public User getUserById(Integer userId) {
        String sql = "SELECT UserID, Username, Address FROM Users WHERE UserID = ?";
        List<User> users = jdbcTemplate.query(sql, (rs, rowNum) -> {
            User user = new User();
            user.setUserId(rs.getInt("UserID"));
            user.setUsername(rs.getString("Username"));
            user.setAddress(rs.getString("Address"));
            return user;
        }, userId);
        return users.isEmpty() ? null : users.get(0);
    }

    public User getUserByUsername(String username) {
        String sql = "SELECT UserID, Username, Address FROM Users WHERE Username = ?";
        List<User> users = jdbcTemplate.query(sql, (rs, rowNum) -> {
            User user = new User();
            user.setUserId(rs.getInt("UserID"));
            user.setUsername(rs.getString("Username"));
            user.setAddress(rs.getString("Address"));
            return user;
        }, username);
        return users.isEmpty() ? null : users.get(0);
    }

public UserAuth getUserAuthById(Integer userId) {
    String sql = "SELECT UserID, PasswordHash, Salt FROM UserAuth WHERE UserID = ?";
    List<UserAuth> auths = jdbcTemplate.query(sql, (rs, rowNum) -> {
        UserAuth auth = new UserAuth();
        auth.setUserId(rs.getInt("UserID"));
        auth.setPasswordHash(rs.getBytes("PasswordHash"));
        auth.setSalt(rs.getBytes("Salt")); 
        return auth;
    }, userId);
    return auths.isEmpty() ? null : auths.get(0);
}

    public boolean loginUser(String username, String password) {
        try {
            User user = getUserByUsername(username);
            if (user == null) {
                return false;
            }

            UserAuth auth = getUserAuthById(user.getUserId());
            if (auth == null) {
                return false;
            }

            byte[] realSalt = dec.decode(auth.getSalt());
            String hashedPassword = this.hashPassword(realSalt, password);
            return hashedPassword.equals(new String(auth.getPasswordHash(), StandardCharsets.UTF_8));
        } catch (Exception e) {
            return false;
        }
    }



    public void createUser(String username, String address) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("newUser");

        Map<String, Object> inParams = new HashMap<>();
        inParams.put("Username", username);
        inParams.put("Address", address);

        jdbcCall.execute(inParams);
    }

    public void changeUsername(Integer userId, String newUsername) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("changeUsername");

        Map<String, Object> inParams = new HashMap<>();
        inParams.put("userID", userId);
        inParams.put("newUsername", newUsername);

        jdbcCall.execute(inParams);
    }

    public void changeAddress(Integer userId, String newAddress) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("changeAddress");

        Map<String, Object> inParams = new HashMap<>();
        inParams.put("userID", userId);
        inParams.put("newAddress", newAddress);

        jdbcCall.execute(inParams);
    }

    public void deleteUser(Integer userId) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("DeleteUser");

        Map<String, Object> inParams = new HashMap<>();
        inParams.put("userID", userId);

        jdbcCall.execute(inParams);
    }

    public void registerNewUser(String username, String address, String password) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
            .withProcedureName("registerNewUser")
            .withSchemaName("dbo")
            .withoutProcedureColumnMetaDataAccess()
            .declareParameters(
                new SqlParameter("Username", Types.NVARCHAR),
                new SqlParameter("Address", Types.NVARCHAR),
                new SqlParameter("PasswordHash", Types.VARBINARY),
                new SqlParameter("Salt", Types.VARBINARY));

        byte[] newPasswordSalt = this.getNewSalt();
		String hashedPassword = this.hashPassword(newPasswordSalt, password);
        String saltBase64 = Base64.getEncoder().encodeToString(newPasswordSalt);

        Map<String, Object> inParams = new HashMap<>();
        inParams.put("Username", username);
        inParams.put("Address", address);
        inParams.put("PasswordHash", hashedPassword.getBytes(StandardCharsets.UTF_8));
        inParams.put("Salt", saltBase64.getBytes(StandardCharsets.UTF_8));

        jdbcCall.execute(inParams);
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
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new RuntimeException("Password hashing failed", e);
        }
        return getStringFromBytes(hash);
    }
}
