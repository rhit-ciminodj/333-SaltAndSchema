package com.example.backend.service;

import com.example.backend.entity.GroceryStores;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GroceryStoreService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public GroceryStoreService(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<GroceryStores> getAllStores() {
        String sql = "SELECT StoreID, Name, Address FROM GroceryStores";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            GroceryStores store = new GroceryStores();
            store.setGroceryStoreId(rs.getInt("StoreID"));
            store.setName(rs.getString("Name"));
            store.setAddress(rs.getString("Address"));
            return store;
        });
    }

    public GroceryStores getStoreById(Integer storeId) {
        String sql = "SELECT StoreID, Name, Address FROM GroceryStores WHERE StoreID = ?";
        List<GroceryStores> stores = jdbcTemplate.query(sql, (rs, rowNum) -> {
            GroceryStores store = new GroceryStores();
            store.setGroceryStoreId(rs.getInt("StoreID"));
            store.setName(rs.getString("Name"));
            store.setAddress(rs.getString("Address"));
            return store;
        }, storeId);
        return stores.isEmpty() ? null : stores.get(0);
    }

    public void createStore(String name, String address) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("newGroceryStore");

        Map<String, Object> inParams = new HashMap<>();
        inParams.put("Name", name);
        inParams.put("Address", address);

        jdbcCall.execute(inParams);
    }

    public void soldByStore(Integer ingredientId, Integer storeId, BigDecimal price) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("soldByStore");

        Map<String, Object> inParams = new HashMap<>();
        inParams.put("IngredientID", ingredientId);
        inParams.put("StoreID", storeId);
        inParams.put("Price", price);

        jdbcCall.execute(inParams);
    }
}
