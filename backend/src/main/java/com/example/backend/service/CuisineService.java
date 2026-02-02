package com.example.backend.service;

import com.example.backend.entity.Cuisine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CuisineService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CuisineService(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Cuisine> getAllCuisines() {
        String sql = "SELECT CuisineID, Name, Description FROM Cuisine";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Cuisine cuisine = new Cuisine();
            cuisine.setCuisineId(rs.getInt("CuisineID"));
            cuisine.setName(rs.getString("Name"));
            cuisine.setDescription(rs.getString("Description"));
            return cuisine;
        });
    }

    public Cuisine getCuisineById(Integer cuisineId) {
        String sql = "SELECT CuisineID, Name, Description FROM Cuisine WHERE CuisineID = ?";
        List<Cuisine> cuisines = jdbcTemplate.query(sql, (rs, rowNum) -> {
            Cuisine cuisine = new Cuisine();
            cuisine.setCuisineId(rs.getInt("CuisineID"));
            cuisine.setName(rs.getString("Name"));
            cuisine.setDescription(rs.getString("Description"));
            return cuisine;
        }, cuisineId);
        return cuisines.isEmpty() ? null : cuisines.get(0);
    }

    public void createCuisine(String name, String description) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("newCuisine");

        Map<String, Object> inParams = new HashMap<>();
        inParams.put("Name", name);
        inParams.put("Description", description);

        jdbcCall.execute(inParams);
    }

    public void addCuisineToRecipe(Integer cuisineId, Integer recipeId) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("addCuisineToRecipe");

        Map<String, Object> inParams = new HashMap<>();
        inParams.put("CuisineID", cuisineId);
        inParams.put("RecipeID", recipeId);

        jdbcCall.execute(inParams);
    }
}
