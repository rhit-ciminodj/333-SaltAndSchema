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

import com.example.backend.entity.TypeOf;
import com.example.backend.service.TypeOfService;

@RestController
@RequestMapping("/api/type-of")
public class TypeOfController {

    @Autowired
    private TypeOfService typeOfService;

    @PostMapping("/add")
    public ResponseEntity<String> addCuisineToRecipe(@RequestBody TypeOf typeOf) {
        try {
            typeOfService.addCuisineToRecipe(typeOf.getId().getCuisineId().longValue(), typeOf.getId().getRecipeId().longValue());
            return ResponseEntity.ok("Cuisine linked to recipe successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/recipe/{recipeId}")
    public List<TypeOf> getCuisinesByRecipe(@PathVariable Long recipeId) {
        return typeOfService.findCuisineByRecipe(recipeId);
    }

    @GetMapping("/cuisine/{cuisineId}")
    public List<TypeOf> getRecipesByCuisine(@PathVariable Long cuisineId) {
        return typeOfService.findRecipeByCuisine(cuisineId);
    }
    
}
