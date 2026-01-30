package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.GroceryStores;
import com.example.backend.repository.GroceryStoreRepository;

@RestController
@RequestMapping("/api/grocerystores")
public class GroceryStoreController {

    @Autowired
    private GroceryStoreRepository groceryStoreRepository;

    @GetMapping
    public List<GroceryStores> getAllStores() {
        return groceryStoreRepository.findAll();
    }

    @PostMapping
    public void createStore(@RequestBody GroceryStores store) {
        groceryStoreRepository.newGroceryStore(
            store.getName(),
            store.getAddress()
        );
    }
}

