package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Service
public class HasEatenService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public HasEatenService(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public void userHasEaten(Integer userId, Integer recipeId, Boolean favorites, Integer stars) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("userHasEaten");

        Map<String, Object> inParams = new HashMap<>();
        inParams.put("UserID", userId);
        inParams.put("RecipeID", recipeId);
        inParams.put("Favorites", favorites != null ? favorites : false);
        inParams.put("Stars", stars);

        jdbcCall.execute(inParams);
    }
}
