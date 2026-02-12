package com.example.backend.service;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.example.backend.entity.GroceryStoreOwners;
import com.example.backend.entity.GroceryStoreOwnersID;

@Service
public class GroceryStoreOwnersService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public GroceryStoreOwnersService(DataSource datasource) {
        this.jdbcTemplate = new JdbcTemplate(datasource);
    }

    public List<GroceryStoreOwners> getGroceryStoreOwnerByID(Long userID) {
        return jdbcTemplate.query("EXEC getUserOwnedGroceryStore @UserID=?", (rs, rowNum) -> {
            GroceryStoreOwners groceryStoreOwner = new GroceryStoreOwners();
            GroceryStoreOwnersID id = new GroceryStoreOwnersID(userID.intValue(), rs.getInt("StoreID"));
            groceryStoreOwner.setId(id);
            return groceryStoreOwner;
        }, userID);
    }

    public void assignGroceryStoreToOwner(Long userID, Long groceryStoreID) {
        jdbcTemplate.update("EXEC assignStoreToOwner @UserID=?, @StoreID=?", userID, groceryStoreID);
    }

    public int isGroceryStoreOwner(Long userID) {
        return jdbcTemplate.queryForObject("EXEC isGroceryStoreOwner @UserID=?", Integer.class, userID);
    }
    
}
