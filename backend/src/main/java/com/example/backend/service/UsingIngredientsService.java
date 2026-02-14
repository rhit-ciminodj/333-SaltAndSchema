package com.example.backend.service;

import java.util.Base64;
import java.util.List;
import java.util.Random;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
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
        jdbcTemplate.update("EXEC AddUsingIngredients @IngredientID=?, @RecipeID=? @Amount=?", IngredientID, RecipeId, amount);
    }
}
