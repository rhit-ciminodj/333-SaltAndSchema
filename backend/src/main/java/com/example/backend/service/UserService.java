package com.example.backend.service;

import java.util.Base64;
import java.util.List;
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
import org.springframework.stereotype.Service;

import com.example.backend.entity.User;
import com.example.backend.entity.UserAuth;

@Service
public class UserService {


	private static final Random RANDOM = new SecureRandom();
	private static final Base64.Encoder enc = Base64.getEncoder();

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserService(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<User> getAllUsers() {
        return jdbcTemplate.query("EXEC getAllUsers", (rs, rowNum) -> {
            User user = new User();
            user.setUserId(rs.getInt("UserID"));
            user.setUsername(rs.getString("Username"));
            user.setAddress(rs.getString("Address"));
            return user;
        });
    }

    public User getUserById(Integer userId) {
        List<User> users = jdbcTemplate.query("EXEC getUserById @UserID=?", (rs, rowNum) -> {
            User user = new User();
            user.setUserId(rs.getInt("UserID"));
            user.setUsername(rs.getString("Username"));
            user.setAddress(rs.getString("Address"));
            return user;
        }, userId);
        return users.isEmpty() ? null : users.get(0);
    }

    public User getUserByUsername(String username) {
        List<User> users = jdbcTemplate.query("EXEC getUserByUsername @Username=?", (rs, rowNum) -> {
            User user = new User();
            user.setUserId(rs.getInt("UserID"));
            user.setUsername(rs.getString("Username"));
            user.setAddress(rs.getString("Address"));
            return user;
        }, username);
        return users.isEmpty() ? null : users.get(0);
    }

public UserAuth getUserAuthById(Integer userId) {
    List<UserAuth> auths = jdbcTemplate.query("EXEC getUserAuth @UserID=?", (rs, rowNum) -> {
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

            byte[] storedSalt = auth.getSalt();
            byte[] storedHash = auth.getPasswordHash();
            
            String hashedPassword = this.hashPassword(storedSalt, password);
            byte[] computedHash = hashedPassword.getBytes(StandardCharsets.UTF_8);
            
            if (storedHash.length != computedHash.length) {
                return false;
            }
            for (int i = 0; i < storedHash.length; i++) {
                if (storedHash[i] != computedHash[i]) {
                    return false;
                }
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }



    public void createUser(String username, String address) {
        jdbcTemplate.update("EXEC newUser @Username=?, @Address=?", username, address);
    }

    public void changeUsername(Integer userId, String newUsername) {
        jdbcTemplate.update("EXEC changeUsername @userID=?, @newUsername=?", userId, newUsername);
    }

    public void changeAddress(Integer userId, String newAddress) {
        jdbcTemplate.update("EXEC changeAddress @userID=?, @newAddress=?", userId, newAddress);
    }

    public void deleteUser(Integer userId) {
        jdbcTemplate.update("EXEC DeleteUser @userID=?", userId);
    }

    public void registerNewUser(String username, String address, String password) {
        byte[] newPasswordSalt = this.getNewSalt();
        String hashedPasswordStr = this.hashPassword(newPasswordSalt, password);
        byte[] hashedPasswordBytes = hashedPasswordStr.getBytes(StandardCharsets.UTF_8);

        jdbcTemplate.update("EXEC registerNewUser @Username=?, @Address=?, @PasswordHash=?, @Salt=?",
            username, address, hashedPasswordBytes, newPasswordSalt);
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
