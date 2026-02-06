package com.example.backend.service;

import com.example.backend.entity.GroceryStores;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.math.BigDecimal;
import java.util.List;

@Service
public class GroceryStoreService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public GroceryStoreService(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<GroceryStores> getAllStores() {
        return jdbcTemplate.query("EXEC getAllGroceryStores", (rs, rowNum) -> {
            GroceryStores store = new GroceryStores();
            store.setGroceryStoreId(rs.getInt("StoreID"));
            store.setName(rs.getString("Name"));
            store.setAddress(rs.getString("Address"));
            return store;
        });
    }

    public GroceryStores getStoreById(Integer storeId) {
        List<GroceryStores> stores = jdbcTemplate.query("EXEC getGroceryStoreById @StoreID=?", (rs, rowNum) -> {
            GroceryStores store = new GroceryStores();
            store.setGroceryStoreId(rs.getInt("StoreID"));
            store.setName(rs.getString("Name"));
            store.setAddress(rs.getString("Address"));
            return store;
        }, storeId);
        return stores.isEmpty() ? null : stores.get(0);
    }

    public void createStore(String name, String address) {
        jdbcTemplate.update("EXEC newGroceryStore @Name=?, @Address=?", name, address);
    }

    public void soldByStore(Integer ingredientId, Integer storeId, BigDecimal price) {
        jdbcTemplate.update("EXEC soldByStore @IngredientID=?, @StoreID=?, @Price=?", ingredientId, storeId, price);
    }
}
