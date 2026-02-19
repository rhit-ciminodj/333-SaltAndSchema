package com.example.backend.service;

import com.example.backend.dto.RecipeMatchRequest;
import com.example.backend.entity.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

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

    public void getByCaloriesASC() {
        List<Recipe> recipes = this.getAllRecipes();
        recipes.sort((r1, r2) -> Short.compare(r1.getCalories(), r2.getCalories()));
    }

    public void getByCaloriesDESC() {
        List<Recipe> recipes = this.getAllRecipes();
        recipes.sort((r1, r2) -> Short.compare(r2.getCalories(), r1.getCalories()));
    }

    public void getByTimeToCookASC() {
        List<Recipe> recipes = this.getAllRecipes();
        recipes.sort((r1, r2) -> Short.compare(r1.getTimeToCook(), r2.getTimeToCook()));
    }

    public void getByTimeToCookDESC() {
        List<Recipe> recipes = this.getAllRecipes();
        recipes.sort((r1, r2) -> Short.compare(r2.getTimeToCook(), r1.getTimeToCook()));
    }

    public void getByStarsASC() {
        List<Recipe> recipes = this.getAllRecipes();
        recipes.sort((r1, r2) -> {
            Double stars1 = this.getRecipeStars(r1.getRecipeId());
            Double stars2 = this.getRecipeStars(r2.getRecipeId());
            return Double.compare(stars1 != null ? stars1 : 0.0, stars2 != null ? stars2 : 0.0);
        });
    }

    public void getByStarsDESC() {
        List<Recipe> recipes = this.getAllRecipes();
        recipes.sort((r1, r2) -> {
            Double stars1 = this.getRecipeStars(r1.getRecipeId());
            Double stars2 = this.getRecipeStars(r2.getRecipeId());
            return Double.compare(stars2 != null ? stars2 : 0.0, stars1 != null ? stars1 : 0.0);
        });
    }

    public List<RecipeMatchRequest> getMatchRecipe(List<String> ingredientNames) {
        List<String> normalized = ingredientNames == null ? Collections.emptyList() : ingredientNames.stream()
            .filter(name -> name != null && !name.trim().isEmpty())
            .map(name -> name.trim().toLowerCase(Locale.ROOT))
            .distinct()
            .collect(Collectors.toList());

        if (normalized.isEmpty()) {
            return Collections.emptyList();
        }

        String ingredientList = String.join(",", normalized);
        return jdbcTemplate.query("EXEC getRecipeMatchesByIngredients @IngredientNames=?", (rs, rowNum) -> {
            RecipeMatchRequest match = new RecipeMatchRequest();
            match.setRecipeId(rs.getInt("RecipeID"));
            match.setName(rs.getString("Name"));
            match.setServingSize(rs.getShort("ServingSize"));
            match.setUserAuthorId(rs.getInt("UserAuthorID"));
            match.setRestaurantAuthorId(rs.getInt("RestaurantAuthorId"));
            match.setTypeOfDish(rs.getString("TypeOfDish"));
            match.setCalories(rs.getShort("Calories"));
            match.setDescription(rs.getString("Description"));
            match.setTimeToCook(rs.getShort("TimeToCook"));
            match.setInstructionSet(rs.getString("InstructionSet"));

            int matched = rs.getInt("MatchedCount");
            int total = rs.getInt("TotalCount");
            match.setMatchedCount(matched);
            match.setTotalCount(total);
            match.setMatchPercent(rs.getDouble("MatchPercent"));
            return match;
        }, ingredientList);
    }
}
