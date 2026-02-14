package com.example.backend.service;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.example.backend.entity.UsingEquip;
import com.example.backend.entity.UsingEquipId;

@Service
public class UsingEquipService {
     private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UsingEquipService(DataSource datasource) {
        this.jdbcTemplate = new JdbcTemplate(datasource);
    }

    public void AddUsingEquip(long RecipeID, long EquipmentID){
        jdbcTemplate.update("EXEC AddUsingEquip @RecipeID=?, @EquipID=?", RecipeID, EquipmentID);
    }

    public List<UsingEquip> getUsingEquip(Long RecipeID) {
        return jdbcTemplate.query("EXEC getUsingEquip @RecipeID=?", (rs, rowNum) -> {
            UsingEquip UsingEquip = new UsingEquip();
            UsingEquipId id = new UsingEquipId(rs.getInt("RecipeID"), rs.getInt("EquipmentID"));
            UsingEquip.setId(id);
            return UsingEquip;
        }, RecipeID);
    }
}
