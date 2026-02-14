package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.UsingIngredients;
import com.example.backend.service.UsingIngredientsService;

@RestController
@RequestMapping("/api/UsingIngredients")
public class UsingIngredientsController {

     @Autowired
    private UsingIngredientsService UsingIngredientsService;

    @PostMapping("/{IngredientID}/{RecipeID}/{Amount}")
    public void newSubstitutes(@PathVariable Long IngredientID, @PathVariable Long RecipeID, @PathVariable Long Amount) {
        this.UsingIngredientsService.AddUsingIngredients(IngredientID, RecipeID, Amount);
    }
}
