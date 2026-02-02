package com.example.backend.service;

import com.example.backend.entity.Equipment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EquipmentService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public EquipmentService(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Equipment> getAllEquipment() {
        String sql = "SELECT EquipID, Name, Description FROM Equipment";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Equipment equipment = new Equipment();
            equipment.setEquipmentId(rs.getInt("EquipID"));
            equipment.setName(rs.getString("Name"));
            equipment.setDescription(rs.getString("Description"));
            return equipment;
        });
    }

    public Equipment getEquipmentById(Integer equipId) {
        String sql = "SELECT EquipID, Name, Description FROM Equipment WHERE EquipID = ?";
        List<Equipment> equipmentList = jdbcTemplate.query(sql, (rs, rowNum) -> {
            Equipment equipment = new Equipment();
            equipment.setEquipmentId(rs.getInt("EquipID"));
            equipment.setName(rs.getString("Name"));
            equipment.setDescription(rs.getString("Description"));
            return equipment;
        }, equipId);
        return equipmentList.isEmpty() ? null : equipmentList.get(0);
    }

    public void createEquipment(String name, String description) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("newEquipment");

        Map<String, Object> inParams = new HashMap<>();
        inParams.put("Name", name);
        inParams.put("Description", description);

        jdbcCall.execute(inParams);
    }

    public void addEquipToRecipe(Integer recipeId, Integer equipmentId) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("addEquipToRecipe");

        Map<String, Object> inParams = new HashMap<>();
        inParams.put("RecipeID", recipeId);
        inParams.put("EquipmentID", equipmentId);

        jdbcCall.execute(inParams);
    }
}
