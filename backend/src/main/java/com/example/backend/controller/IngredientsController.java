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

import com.example.backend.entity.Ingredients;
import com.example.backend.service.IngredientsService;

@RestController
@RequestMapping("/api/ingredients")
public class IngredientsController {

    @Autowired
    private IngredientsService ingredientsService;

    @GetMapping
    public List<Ingredients> getAllIngredients() {
        return ingredientsService.getAllIngredients();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ingredients> getIngredientById(@PathVariable Integer id) {
        Ingredients ingredient = ingredientsService.getIngredientById(id);
        if (ingredient != null) {
            return ResponseEntity.ok(ingredient);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<String> createIngredient(@RequestBody Ingredients ingredient) {
        try {
            ingredientsService.newIngredient(ingredient.getName(), ingredient.getDescription());
            return ResponseEntity.ok("Ingredient created successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
