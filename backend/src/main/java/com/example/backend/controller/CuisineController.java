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

import com.example.backend.entity.Cuisine;
import com.example.backend.service.CuisineService;

@RestController
@RequestMapping("/api/cuisines")
public class CuisineController {

    @Autowired
    private CuisineService cuisineService;

    @GetMapping
    public List<Cuisine> getAllCuisines() {
        return cuisineService.getAllCuisines();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cuisine> getCuisineById(@PathVariable Integer id) {
        Cuisine cuisine = cuisineService.getCuisineById(id);
        if (cuisine != null) {
            return ResponseEntity.ok(cuisine);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<String> createCuisine(@RequestBody Cuisine cuisine) {
        try {
            cuisineService.createCuisine(
                cuisine.getName(),
                cuisine.getDescription()
            );
            return ResponseEntity.ok("Cuisine created successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}

