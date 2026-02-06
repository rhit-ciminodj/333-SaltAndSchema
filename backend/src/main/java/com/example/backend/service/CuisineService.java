package com.example.backend.service;

import com.example.backend.entity.Cuisine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.List;

@Service
public class CuisineService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CuisineService(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Cuisine> getAllCuisines() {
        return jdbcTemplate.query("EXEC getAllCuisines", (rs, rowNum) -> {
            Cuisine cuisine = new Cuisine();
            cuisine.setCuisineId(rs.getInt("CuisineID"));
            cuisine.setName(rs.getString("Name"));
            cuisine.setDescription(rs.getString("Description"));
            return cuisine;
        });
    }

    public Cuisine getCuisineById(Integer cuisineId) {
        List<Cuisine> cuisines = jdbcTemplate.query("EXEC getCuisineById @CuisineID=?", (rs, rowNum) -> {
            Cuisine cuisine = new Cuisine();
            cuisine.setCuisineId(rs.getInt("CuisineID"));
            cuisine.setName(rs.getString("Name"));
            cuisine.setDescription(rs.getString("Description"));
            return cuisine;
        }, cuisineId);
        return cuisines.isEmpty() ? null : cuisines.get(0);
    }

    public void createCuisine(String name, String description) {
        jdbcTemplate.update("EXEC newCuisine @Name=?, @Description=?", name, description);
    }

    public void addCuisineToRecipe(Integer cuisineId, Integer recipeId) {
        jdbcTemplate.update("EXEC addCuisineToRecipe @CuisineID=?, @RecipeID=?", cuisineId, recipeId);
    }
}
