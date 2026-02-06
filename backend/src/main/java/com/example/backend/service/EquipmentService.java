package com.example.backend.service;

import com.example.backend.entity.Equipment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.List;

@Service
public class EquipmentService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public EquipmentService(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Equipment> getAllEquipment() {
        return jdbcTemplate.query("EXEC getAllEquipment", (rs, rowNum) -> {
            Equipment equipment = new Equipment();
            equipment.setEquipmentId(rs.getInt("EquipID"));
            equipment.setName(rs.getString("Name"));
            equipment.setDescription(rs.getString("Description"));
            return equipment;
        });
    }

    public Equipment getEquipmentById(Integer equipId) {
        List<Equipment> equipmentList = jdbcTemplate.query("EXEC getEquipmentById @EquipID=?", (rs, rowNum) -> {
            Equipment equipment = new Equipment();
            equipment.setEquipmentId(rs.getInt("EquipID"));
            equipment.setName(rs.getString("Name"));
            equipment.setDescription(rs.getString("Description"));
            return equipment;
        }, equipId);
        return equipmentList.isEmpty() ? null : equipmentList.get(0);
    }

    public void createEquipment(String name, String description) {
        jdbcTemplate.update("EXEC newEquipment @Name=?, @Description=?", name, description);
    }

    public void addEquipToRecipe(Integer recipeId, Integer equipmentId) {
        jdbcTemplate.update("EXEC addEquipToRecipe @RecipeID=?, @EquipmentID=?", recipeId, equipmentId);
    }
}
