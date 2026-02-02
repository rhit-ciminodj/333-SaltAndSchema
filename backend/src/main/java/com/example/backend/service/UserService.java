package com.example.backend.service;

import com.example.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

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
}
