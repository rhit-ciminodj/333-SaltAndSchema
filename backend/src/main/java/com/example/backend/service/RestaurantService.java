package com.example.backend.service;

import com.example.backend.entity.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RestaurantService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public RestaurantService(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Restaurant> getAllRestaurants() {
        String sql = "SELECT RestID, Name, Rating, Address FROM Restaurant";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Restaurant restaurant = new Restaurant();
            restaurant.setRestaurantId(rs.getInt("RestID"));
            restaurant.setName(rs.getString("Name"));
            restaurant.setRating(rs.getBigDecimal("Rating"));
            restaurant.setAddress(rs.getString("Address"));
            return restaurant;
        });
    }

    public Restaurant getRestaurantById(Integer restId) {
        String sql = "SELECT RestID, Name, Rating, Address FROM Restaurant WHERE RestID = ?";
        List<Restaurant> restaurants = jdbcTemplate.query(sql, (rs, rowNum) -> {
            Restaurant restaurant = new Restaurant();
            restaurant.setRestaurantId(rs.getInt("RestID"));
            restaurant.setName(rs.getString("Name"));
            restaurant.setRating(rs.getBigDecimal("Rating"));
            restaurant.setAddress(rs.getString("Address"));
            return restaurant;
        }, restId);
        return restaurants.isEmpty() ? null : restaurants.get(0);
    }

    public void createRestaurant(String name, BigDecimal rating, String address) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("newRestaurant");

        Map<String, Object> inParams = new HashMap<>();
        inParams.put("Name", name);
        inParams.put("Rating", rating);
        inParams.put("Address", address);

        jdbcCall.execute(inParams);
    }

    public void linkRecipeToRestaurant(Integer restId, Integer recipeId, BigDecimal cost) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("linkRecipeToRestaurant");

        Map<String, Object> inParams = new HashMap<>();
        inParams.put("RestID", restId);
        inParams.put("RecipeID", recipeId);
        inParams.put("Cost", cost);

        jdbcCall.execute(inParams);
    }

    public void changePriceOfItem(Integer restaurantId, Integer recipeId, BigDecimal newCost) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("changePriceOfItem");

        Map<String, Object> inParams = new HashMap<>();
        inParams.put("RestaurantID", restaurantId);
        inParams.put("RecipeID", recipeId);
        inParams.put("newCost", newCost);

        jdbcCall.execute(inParams);
    }
}
