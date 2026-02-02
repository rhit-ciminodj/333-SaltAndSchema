package com.example.backend.service;

import com.example.backend.entity.Ingredients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class IngredientsService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public IngredientsService(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Ingredients> getAllIngredients() {
        String sql = "SELECT IngredientsID, Name, Description FROM Ingredients";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Ingredients ingredient = new Ingredients();
            ingredient.setIngredientId(rs.getInt("IngredientsID"));
            ingredient.setName(rs.getString("Name"));
            ingredient.setDescription(rs.getString("Description"));
            return ingredient;
        });
    }

    public Ingredients getIngredientById(Integer ingredientId) {
        String sql = "SELECT IngredientsID, Name, Description FROM Ingredients WHERE IngredientsID = ?";
        List<Ingredients> ingredients = jdbcTemplate.query(sql, (rs, rowNum) -> {
            Ingredients ingredient = new Ingredients();
            ingredient.setIngredientId(rs.getInt("IngredientsID"));
            ingredient.setName(rs.getString("Name"));
            ingredient.setDescription(rs.getString("Description"));
            return ingredient;
        }, ingredientId);
        return ingredients.isEmpty() ? null : ingredients.get(0);
    }

    public void newIngredient(String name, String description) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("newIngredient");

        Map<String, Object> inParams = new HashMap<>();
        inParams.put("Name", name);
        inParams.put("Description", description);

        jdbcCall.execute(inParams);
    }

    public void addIngredientToRecipe(Integer ingredientId, Integer recipeId, Short quantity) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("addIngredientToRecipe");

        Map<String, Object> inParams = new HashMap<>();
        inParams.put("IngredientID", ingredientId);
        inParams.put("RecipeID", recipeId);
        inParams.put("Quantity", quantity);

        jdbcCall.execute(inParams);
    }

    public void addSubstituteToIngredient(Integer ingredientId, Integer substituteId) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("addSubstituteToIngredient");

        Map<String, Object> inParams = new HashMap<>();
        inParams.put("IngredientID", ingredientId);
        inParams.put("SubstituteID", substituteId);

        jdbcCall.execute(inParams);
    }
}
