package com.example.backend.service;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.example.backend.entity.Substitutes;
import com.example.backend.entity.SubstitutesId;


@Service
public class SubstitutesService {
    
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public SubstitutesService(DataSource datasource) {
        this.jdbcTemplate = new JdbcTemplate(datasource);
    }

    public List<Substitutes> getIngredientSubstitutes(Long IngredientID) {
        return jdbcTemplate.query("EXEC getIngredientSubstitutes @IngredientID=?", (rs, rowNum) -> {
            Substitutes substitute = new Substitutes();
            SubstitutesId id = new SubstitutesId(rs.getInt("IngredientID"), rs.getInt("SubstituteID"));
            substitute.setId(id);
            return substitute;
        }, IngredientID);
    }

    public void newSubstitutes(Long IngredientID, Long SubstituteID) {
        jdbcTemplate.update("EXEC newSubstitutes @IngredientID=?, @SubstituteID=?", IngredientID, SubstituteID);
    }
}
