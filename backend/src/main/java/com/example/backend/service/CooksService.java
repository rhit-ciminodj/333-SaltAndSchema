package com.example.backend.service;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.example.backend.entity.Cooks;
import com.example.backend.entity.CooksId;

@Service
public class CooksService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CooksService(DataSource datasource) {
        this.jdbcTemplate = new JdbcTemplate(datasource);
    }

    public void addRecipeToRestaurant(Long RecipeID, Long RestaurantID, Double Price) {
        jdbcTemplate.update("EXEC linkRecipeToRestaurant @RestID=?, @RecipeID=?, @Cost=?", RecipeID, RestaurantID, Price);
    }

    public List<Cooks> getRecipesByRestaurant(Long RestaurantID) {
        return jdbcTemplate.query("EXEC findRecipesByRestaurant @RestID=?", (rs, rowNum) -> {
            Cooks cook = new Cooks();
            CooksId id = new CooksId(rs.getInt("RestaurantID"), rs.getInt("RecipeID"));
            cook.setId(id);
            cook.setCostOfItem(rs.getBigDecimal("Cost"));   
            return cook;
        }, RestaurantID);
    }
    
}
