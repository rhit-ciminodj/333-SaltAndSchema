package com.example.backend.service;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.example.backend.entity.RestaurantOwners;
import com.example.backend.entity.RestaurantOwnersID;

@Service
public class RestaurantOwnersService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public RestaurantOwnersService(DataSource datasource) {
        this.jdbcTemplate = new JdbcTemplate(datasource);
    }

    public List<RestaurantOwners> getRestaurantOwnerByID(Long userID) {
        return jdbcTemplate.query("EXEC getUserOwnedRestaurant @UserID=?", (rs, rowNum) -> {
            RestaurantOwners restaurantOwner = new RestaurantOwners();
            RestaurantOwnersID id = new RestaurantOwnersID(userID.intValue(), rs.getInt("RestID"));
            restaurantOwner.setId(id);
            return restaurantOwner;
        }, userID);
    }

    public void assignRestaurantToOwner(Long userID, Long restaurantID) {
        jdbcTemplate.update("EXEC assignRestaurantToOwner @UserID=?, @RestaurantID=?", userID, restaurantID);
    }

    public int isRestaurantOwner(Long userID) {
        return jdbcTemplate.queryForObject("EXEC isRestaurantOwner @UserID=?", Integer.class, userID);
    }
    
}
