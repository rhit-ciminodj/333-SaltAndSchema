package com.example.backend.service;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.example.backend.entity.SoldBy;
import com.example.backend.entity.SoldById;
import com.example.backend.entity.TypeOf;
import com.example.backend.entity.TypeOfId;

@Service
public class TypeOfService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public TypeOfService(DataSource datasource) {
        this.jdbcTemplate = new JdbcTemplate(datasource);
    }

    public void addCuisineToRecipe(Long CuisineID, Long RecipeID) {
        jdbcTemplate.update("EXEC addCuisineToRecipe @CuisineID=?, @RecipeID=?", CuisineID, RecipeID);
    }

    public List<TypeOf> findCuisineByRecipe(Long RecipeID) {
        return jdbcTemplate.query("EXEC findCuisineByRecipe @RecipeID=?", (rs, rowNum) -> {
            TypeOf typeOf = new TypeOf();
            TypeOfId id = new TypeOfId(rs.getInt("RecipeID"), rs.getInt("CuisineID"));
            typeOf.setId(id);
            return typeOf;
        }, RecipeID);
    }

    public List<TypeOf> findRecipeByCuisine(Long CuisineID) {
        return jdbcTemplate.query("EXEC findRecipeByCuisine @CuisineID=?", (rs, rowNum) -> {
            TypeOf typeOf = new TypeOf();
            TypeOfId id = new TypeOfId(rs.getInt("RecipeID"), rs.getInt("CuisineID"));
            typeOf.setId(id);
            return typeOf;
        }, CuisineID);
    }

}
