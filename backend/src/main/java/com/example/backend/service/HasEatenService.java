package com.example.backend.service;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.example.backend.entity.HasEaten;
import com.example.backend.entity.HasEatenId;

@Service
public class HasEatenService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public HasEatenService(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<HasEaten> getHasEatenHistory(Long userId) {
        return jdbcTemplate.query("EXEC getHasEatenByUser @UserID=?", (rs, rowNum) -> {
            HasEaten hasEaten = new HasEaten();
            HasEatenId id = new HasEatenId(rs.getInt("UserID"), rs.getInt("RecipeID"));
            hasEaten.setId(id);
            hasEaten.setFavorites(rs.getBoolean("Favorites"));
            hasEaten.setStars(rs.getInt("Stars"));
            return hasEaten;
        }, userId);
    }

    public List<HasEaten> getFavoriteRecipes(Long userId) {
        return jdbcTemplate.query("EXEC getUserFavorites @UserID=?", (rs, rowNum) -> {
            HasEaten hasEaten = new HasEaten();
            HasEatenId id = new HasEatenId(rs.getInt("UserID"), rs.getInt("RecipeID"));
            hasEaten.setId(id);
            hasEaten.setFavorites(rs.getBoolean("Favorites"));
            hasEaten.setStars(rs.getInt("Stars"));
            return hasEaten;
        }, userId);
    }

    public HasEaten getUserRecipeRating(Integer userId, Integer recipeId) {
        List<HasEaten> results = jdbcTemplate.query("EXEC getHasEatenRecord @UserID=?, @RecipeID=?", (rs, rowNum) -> {
            HasEaten hasEaten = new HasEaten();
            HasEatenId id = new HasEatenId(rs.getInt("UserID"), rs.getInt("RecipeID"));
            hasEaten.setId(id);
            hasEaten.setFavorites(rs.getBoolean("Favorites"));
            hasEaten.setStars(rs.getInt("Stars"));
            return hasEaten;
        }, userId, recipeId);
        return results.isEmpty() ? null : results.get(0);
    }

    public void userHasEaten(Integer userId, Integer recipeId, Boolean favorites, Integer stars) {
        Integer count = jdbcTemplate.queryForObject("EXEC hasEatenExists @UserID=?, @RecipeID=?", Integer.class, userId, recipeId);
        
        if (count != null && count > 0) {
            jdbcTemplate.update("EXEC updateHasEaten @UserID=?, @RecipeID=?, @Favorites=?, @Stars=?",
                userId, recipeId, favorites != null ? favorites : false, stars);
        } else {
            jdbcTemplate.update("EXEC userHasEaten @UserID=?, @RecipeID=?, @Favorites=?, @Stars=?",
                userId, recipeId, favorites != null ? favorites : false, stars);
        }
    }

    public void updateFavoriteStatus(Integer userId, Integer recipeId, Boolean favorites) {
        Integer count = jdbcTemplate.queryForObject("EXEC hasEatenExists @UserID=?, @RecipeID=?", Integer.class, userId, recipeId);
        
        if (count != null && count > 0) {
            jdbcTemplate.update("EXEC updateHasEaten @UserID=?, @RecipeID=?, @Favorites=?", userId, recipeId, favorites);
        } else {
            jdbcTemplate.update("EXEC userHasEaten @UserID=?, @RecipeID=?, @Favorites=?, @Stars=?", 
                userId, recipeId, favorites, null);
        }
    }

    public void updateStars(Integer userId, Integer recipeId, Integer stars) {
        Integer count = jdbcTemplate.queryForObject("EXEC hasEatenExists @UserID=?, @RecipeID=?", Integer.class, userId, recipeId);
        
        if (count != null && count > 0) {
            jdbcTemplate.update("EXEC updateHasEaten @UserID=?, @RecipeID=?, @Stars=?", userId, recipeId, stars);
        } else {
            jdbcTemplate.update("EXEC userHasEaten @UserID=?, @RecipeID=?, @Favorites=?, @Stars=?", 
                userId, recipeId, false, stars);
        }
    }
}
