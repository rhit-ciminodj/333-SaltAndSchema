package com.example.backend.service;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.example.backend.entity.SoldBy;
import com.example.backend.entity.SoldById;

@Service
public class SoldByService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public SoldByService(DataSource datasource) {
        this.jdbcTemplate = new JdbcTemplate(datasource);
    }

    public void addIngredientToStore(Long IngredientID, Long StoreID, Double Price) {
        jdbcTemplate.update("EXEC soldByStore @IngredientID=?, @StoreID=?, @Price=?", IngredientID, StoreID, Price);
    }

    public List<SoldBy> findIngredientsByStore(Long StoreID) {
        return jdbcTemplate.query("EXEC findIngredientsByStore @StoreID=?", (rs, rowNum) -> {
            SoldBy sold = new SoldBy();
            SoldById id = new SoldById(rs.getInt("StoreID"), rs.getInt("IngredientID"));
            sold.setId(id);
            sold.setPrice(rs.getBigDecimal("Price")); 
            return sold;
        }, StoreID);
    }
    
}
