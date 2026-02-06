package com.example.backend.service;

import com.example.backend.entity.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.List;

@Service
public class RecipeService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public RecipeService(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Recipe> getAllRecipes() {
        return jdbcTemplate.query("EXEC getAllRecipes", (rs, rowNum) -> {
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
        List<Recipe> recipes = jdbcTemplate.query("EXEC getRecipeById @RecipeID=?", (rs, rowNum) -> {
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
        return jdbcTemplate.queryForObject("EXEC getRecipeAvgStars @RecipeID=?", Double.class, recipeId);
    }

    public void createRecipe(String name, Short servingSize, Integer userAuthorId, Integer restaurantAuthorId,
                             String typeOfDish, Short calories, String description, Short timeToCook, String instructionSet) {
        String username = null;
        if (userAuthorId != null) {
            try {
                username = jdbcTemplate.queryForObject(
                    "EXEC getUsernameById @UserID=?", String.class, userAuthorId);
            } catch (Exception e) {
                // User not found
            }
        }
        
        String restName = null;
        if (restaurantAuthorId != null) {
            try {
                restName = jdbcTemplate.queryForObject(
                    "EXEC getRestaurantNameById @RestID=?", String.class, restaurantAuthorId);
            } catch (Exception e) {
                // Restaurant not found
            }
        }

        jdbcTemplate.update("EXEC newRecipe @Name=?, @ServingSize=?, @UserAuthor=?, @RestName=?, @TypeOfDish=?, @Calories=?, @Description=?, @TimeToCook=?, @InstructionSet=?",
            name, servingSize, username, restName, typeOfDish, calories, description, timeToCook, instructionSet);
    }

    public void updateRecipe(Integer recipeId, Short servingSize, String typeOfDish, Short calories,
                             String description, Short timeToCook, String instructionSet) {
        jdbcTemplate.update("EXEC updateRecipe @recipeID=?, @newServingSize=?, @newTypeOfDish=?, @newCalories=?, @newDescription=?, @newTimeToCook=?, @newInstructionSet=?",
            recipeId, servingSize, typeOfDish, calories, description, timeToCook, instructionSet);
    }
}
