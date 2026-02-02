package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.GroceryStores;
import com.example.backend.service.GroceryStoreService;

@RestController
@RequestMapping("/api/grocerystores")
public class GroceryStoreController {

    @Autowired
    private GroceryStoreService groceryStoreService;

    @GetMapping
    public List<GroceryStores> getAllStores() {
        return groceryStoreService.getAllStores();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroceryStores> getStoreById(@PathVariable Integer id) {
        GroceryStores store = groceryStoreService.getStoreById(id);
        if (store != null) {
            return ResponseEntity.ok(store);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<String> createStore(@RequestBody GroceryStores store) {
        try {
            groceryStoreService.createStore(
                store.getName(),
                store.getAddress()
            );
            return ResponseEntity.ok("Grocery store created successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}

