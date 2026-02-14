package com.example.backend.service;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;


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
}
