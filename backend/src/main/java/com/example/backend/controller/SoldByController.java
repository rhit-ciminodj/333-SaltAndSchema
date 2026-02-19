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

import com.example.backend.entity.SoldBy;
import com.example.backend.service.SoldByService;

@RestController
@RequestMapping("/api/soldby")
public class SoldByController {

    @Autowired
    private SoldByService soldByService;

    @PostMapping("/add")
    public ResponseEntity<String> addIngredientToStore(@RequestBody SoldBy soldBy) {
        try {
            soldByService.addIngredientToStore(soldBy.getId().getIngredientId().longValue(), soldBy.getId().getStoreId().longValue(), soldBy.getPrice().doubleValue());
            return ResponseEntity.ok("Ingredient linked to store successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/store/{storeId}")
    public List<SoldBy> getIngredientsByStore(@PathVariable Long storeId) {
        return soldByService.findIngredientsByStore(storeId);
    }
    
}
