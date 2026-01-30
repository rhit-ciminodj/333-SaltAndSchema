package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.Recipe;
import com.example.backend.repository.RecipeRepository;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    @PostMapping
    public void createRecipe(@RequestBody Recipe recipe) {
        recipeRepository.newRecipe(
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
    }
}
