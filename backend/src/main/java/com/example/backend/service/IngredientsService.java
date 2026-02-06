package com.example.backend.service;

import com.example.backend.entity.Ingredients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.List;

@Service
public class IngredientsService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public IngredientsService(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Ingredients> getAllIngredients() {
        return jdbcTemplate.query("EXEC getAllIngredients", (rs, rowNum) -> {
            Ingredients ingredient = new Ingredients();
            ingredient.setIngredientId(rs.getInt("IngredientsID"));
            ingredient.setName(rs.getString("Name"));
            ingredient.setDescription(rs.getString("Description"));
            return ingredient;
        });
    }

    public List<String> getStoresSellingIngredient(Integer ingredientId) {
        return jdbcTemplate.query("EXEC getStoresByIngredient @IngredientID=?", 
            (rs, rowNum) -> rs.getString("Name"), ingredientId);
    }

    public Ingredients getIngredientById(Integer ingredientId) {
        List<Ingredients> ingredients = jdbcTemplate.query("EXEC getIngredientById @IngredientID=?", (rs, rowNum) -> {
            Ingredients ingredient = new Ingredients();
            ingredient.setIngredientId(rs.getInt("IngredientsID"));
            ingredient.setName(rs.getString("Name"));
            ingredient.setDescription(rs.getString("Description"));
            return ingredient;
        }, ingredientId);
        return ingredients.isEmpty() ? null : ingredients.get(0);
    }

    public void newIngredient(String name, String description) {
        String execSql = "EXEC newIngredient @Name=?, @Desciption=?";
        jdbcTemplate.update(execSql, name, description);
    }

    public void addIngredientToRecipe(Integer ingredientId, Integer recipeId, Short quantity) {
        String execSql = "EXEC addIngredientToRecipe @IngredientID=?, @RecipeID=?, @Quantity=?";
        jdbcTemplate.update(execSql, ingredientId, recipeId, quantity);
    }

    public void addSubstituteToIngredient(Integer ingredientId, Integer substituteId) {
        String execSql = "EXEC addSubstituteToIngredient @IngredientID=?, @SubstituteID=?";
        jdbcTemplate.update(execSql, ingredientId, substituteId);
    }
}
