package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.RecipeMatchRequest;
import com.example.backend.entity.Recipe;
import com.example.backend.service.RecipeService;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @PostMapping("/match")
    public ResponseEntity<List<RecipeMatchRequest>> getMatchRecipe(@RequestBody List<String> ingredients) {
        try {
            List<RecipeMatchRequest> recipes = recipeService.getMatchRecipe(ingredients);
            return ResponseEntity.ok(recipes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Integer id) {
        Recipe recipe = recipeService.getRecipeById(id);
        if (recipe != null) {
            return ResponseEntity.ok(recipe);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/stars")
    public ResponseEntity<Double> getRecipeStars(@PathVariable Integer id) {
        try {
            Double stars = recipeService.getRecipeStars(id);
            return ResponseEntity.ok(stars);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<String> createRecipe(@RequestBody Recipe recipe) {
        try {
            recipeService.createRecipe(
                recipe.getName(),
                recipe.getServingSize(),
                recipe.getUserAuthorId(),
                recipe.getRestaurantAuthorId(),
                recipe.getTypeOfDish(),
                recipe.getCalories(),
                recipe.getDescription(),
                recipe.getTimeToCook(),
                recipe.getInstructionSet()
            );
            return ResponseEntity.ok("Recipe created successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateRecipe(@PathVariable Integer id, @RequestBody Recipe recipe) {
        try {
            recipeService.updateRecipe(
                id,
                recipe.getServingSize(),
                recipe.getTypeOfDish(),
                recipe.getCalories(),
                recipe.getDescription(),
                recipe.getTimeToCook(),
                recipe.getInstructionSet()
            );
            return ResponseEntity.ok("Recipe updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/sort/calories/asc")
    public List<Recipe> getByCaloriesASC() {
        recipeService.getByCaloriesASC();
        return recipeService.getAllRecipes();
    }

    @GetMapping("/sort/calories/desc")
    public List<Recipe> getByCaloriesDESC() {
        recipeService.getByCaloriesDESC();
        return recipeService.getAllRecipes();
    }

    @GetMapping("/sort/time/asc")
    public List<Recipe> getByTimeToCookASC() {
        recipeService.getByTimeToCookASC();
        return recipeService.getAllRecipes();
    }

    @GetMapping("/sort/time/desc")
    public List<Recipe> getByTimeToCookDESC() {
        recipeService.getByTimeToCookDESC();
        return recipeService.getAllRecipes();
    }

    @GetMapping("/sort/stars/asc")
    public List<Recipe> getByStarsASC() {
        recipeService.getByStarsASC();
        return recipeService.getAllRecipes();
    }

    @GetMapping("/sort/stars/desc")
    public List<Recipe> getByStarsDESC() {
        recipeService.getByStarsDESC();
        return recipeService.getAllRecipes();
    }
}