package com.example.backend.service;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.example.backend.entity.UsingIngredients;
import com.example.backend.entity.UsingIngredientsId;


@Service
public class UsingIngredientsService {
     private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UsingIngredientsService(DataSource datasource) {
        this.jdbcTemplate = new JdbcTemplate(datasource);
    }

    public void AddUsingIngredients(long IngredientID, long RecipeId, long amount){
        jdbcTemplate.update("EXEC AddUsingIngredient @IngredientID=?, @RecipeID=?, @Amount=?", IngredientID, RecipeId, amount);
    }

    public List<UsingIngredients> getUsingIngredients(Long RecipeID) {
        return jdbcTemplate.query("EXEC getUsingIngredients @RecipeID=?", (rs, rowNum) -> {
            UsingIngredients UsingIngredients = new UsingIngredients();
            UsingIngredientsId id = new UsingIngredientsId(rs.getInt("IngredientID"), rs.getInt("RecipeID"));
            UsingIngredients.setId(id);
            UsingIngredients.setQuantity(rs.getShort("Quantity"));
            return UsingIngredients;
        }, RecipeID);
    }
}
