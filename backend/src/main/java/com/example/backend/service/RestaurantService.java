package com.example.backend.service;

import com.example.backend.entity.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.math.BigDecimal;
import java.util.List;

@Service
public class RestaurantService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public RestaurantService(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Restaurant> getAllRestaurants() {
        return jdbcTemplate.query("EXEC getAllRestaurants", (rs, rowNum) -> {
            Restaurant restaurant = new Restaurant();
            restaurant.setRestaurantId(rs.getInt("RestID"));
            restaurant.setName(rs.getString("Name"));
            restaurant.setRating(rs.getBigDecimal("Rating"));
            restaurant.setAddress(rs.getString("Address"));
            return restaurant;
        });
    }

    public Restaurant getRestaurantById(Integer restId) {
        List<Restaurant> restaurants = jdbcTemplate.query("EXEC getRestaurantById @RestID=?", (rs, rowNum) -> {
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
        jdbcTemplate.update("EXEC newRestaurant @Name=?, @Rating=?, @Address=?", name, rating, address);
    }

    public void linkRecipeToRestaurant(Integer restId, Integer recipeId, BigDecimal cost) {
        jdbcTemplate.update("EXEC linkRecipeToRestaurant @RestID=?, @RecipeID=?, @Cost=?", restId, recipeId, cost);
    }

    public void changePriceOfItem(Integer restaurantId, Integer recipeId, BigDecimal newCost) {
        jdbcTemplate.update("EXEC changePriceOfItem @RestaurantID=?, @RecipeID=?, @newCost=?", restaurantId, recipeId, newCost);
    }
}
