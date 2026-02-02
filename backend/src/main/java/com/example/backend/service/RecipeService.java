package com.example.backend.service;

import com.example.backend.entity.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RecipeService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public RecipeService(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Recipe> getAllRecipes() {
        String sql = "SELECT RecipeID, Name, ServingSize, UserAuthorID, RestaurantAuthorId, " +
                "TypeOfDish, Calories, Description, TimeToCook, InstructionSet FROM Recipe";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Recipe recipe = new Recipe();
            recipe.setRecipeId(rs.getInt("RecipeID"));
            recipe.setName(rs.getString("Name"));
            recipe.setServingSize(rs.getShort("ServingSize"));
            recipe.setUserAuthorId(rs.getInt("UserAuthorID"));
            recipe.setRestaurantAuthorId(rs.getInt("RestaurantAuthorId"));
            recipe.setTypeOfDish(rs.getString("TypeOfDish"));
            recipe.setCalories(rs.getShort("Calories"));
            recipe.setDescription(rs.getString("Description"));
            recipe.setTimeToCook(rs.getShort("TimeToCook"));
            recipe.setInstructionSet(rs.getString("InstructionSet"));
            return recipe;
        });
    }

    public Recipe getRecipeById(Integer recipeId) {
        String sql = "SELECT RecipeID, Name, ServingSize, UserAuthorID, RestaurantAuthorId, " +
                "TypeOfDish, Calories, Description, TimeToCook, InstructionSet FROM Recipe WHERE RecipeID = ?";
        List<Recipe> recipes = jdbcTemplate.query(sql, (rs, rowNum) -> {
            Recipe recipe = new Recipe();
            recipe.setRecipeId(rs.getInt("RecipeID"));
            recipe.setName(rs.getString("Name"));
            recipe.setServingSize(rs.getShort("ServingSize"));
            recipe.setUserAuthorId(rs.getInt("UserAuthorID"));
            recipe.setRestaurantAuthorId(rs.getInt("RestaurantAuthorId"));
            recipe.setTypeOfDish(rs.getString("TypeOfDish"));
            recipe.setCalories(rs.getShort("Calories"));
            recipe.setDescription(rs.getString("Description"));
            recipe.setTimeToCook(rs.getShort("TimeToCook"));
            recipe.setInstructionSet(rs.getString("InstructionSet"));
            return recipe;
        }, recipeId);
        return recipes.isEmpty() ? null : recipes.get(0);
    }

    public Double getRecipeStars(Integer recipeId) {
        String sql = "SELECT AVG(CAST(Stars AS FLOAT)) as AvgStars FROM HasEaten WHERE RecipeID = ?";
        return jdbcTemplate.queryForObject(sql, Double.class, recipeId);
    }

    public void createRecipe(String name, Short servingSize, Integer userAuthorId, Integer restaurantAuthorId,
                             String typeOfDish, Short calories, String description, Short timeToCook, String instructionSet) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("newRecipe");

        Map<String, Object> inParams = new HashMap<>();
        inParams.put("Name", name);
        inParams.put("ServingSize", servingSize);
        inParams.put("UserAuthorID", userAuthorId);
        inParams.put("RestaurantAuthorID", restaurantAuthorId);
        inParams.put("TypeOfDish", typeOfDish);
        inParams.put("Calories", calories);
        inParams.put("Description", description);
        inParams.put("TimeToCook", timeToCook);
        inParams.put("InstructionSet", instructionSet);

        jdbcCall.execute(inParams);
    }

    public void updateRecipe(Integer recipeId, Short servingSize, String typeOfDish, Short calories,
                             String description, Short timeToCook, String instructionSet) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("updateRecipe");

        Map<String, Object> inParams = new HashMap<>();
        inParams.put("recipeID", recipeId);
        inParams.put("newServingSize", servingSize);
        inParams.put("newTypeOfDish", typeOfDish);
        inParams.put("newCalories", calories);
        inParams.put("newDescription", description);
        inParams.put("newTimeToCook", timeToCook);
        inParams.put("newInstructionSet", instructionSet);

        jdbcCall.execute(inParams);
    }
}
