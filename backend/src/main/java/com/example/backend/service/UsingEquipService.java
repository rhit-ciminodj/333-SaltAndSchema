package com.example.backend.service;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class UsingEquipService {
     private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UsingEquipService(DataSource datasource) {
        this.jdbcTemplate = new JdbcTemplate(datasource);
    }

    public void AddUsingEquip(long RecipeID, long EquipmentID){
        jdbcTemplate.update("EXEC AddUsingEquip @RecipeID=?, @EquipID=?", EquipmentID, RecipeID);
    }
}
