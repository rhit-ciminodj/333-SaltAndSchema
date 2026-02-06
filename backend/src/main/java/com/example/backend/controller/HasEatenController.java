package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.RateRequest;
import com.example.backend.entity.HasEaten;
import com.example.backend.service.HasEatenService;

@RestController
@RequestMapping("/api/has-eaten")
public class HasEatenController {

    @Autowired
    private HasEatenService hasEatenService;

    @GetMapping("/{userId}/history")
    public List<HasEaten> getHasEatenHistory(@PathVariable Long userId) {
        return hasEatenService.getHasEatenHistory(userId);
    }

    @GetMapping("/{userId}/favorites")
    public List<HasEaten> getFavoriteRecipes(@PathVariable Long userId) {
        return hasEatenService.getFavoriteRecipes(userId);
    }

    @GetMapping("/{userId}/recipes/{recipeId}")
    public HasEaten getUserRecipeRating(@PathVariable Long userId, @PathVariable Integer recipeId) {
        return hasEatenService.getUserRecipeRating(userId.intValue(), recipeId);
    }

    @PostMapping("/{userId}/recipes/{recipeId}/rate")
    public void rateRecipe(@PathVariable Long userId, @PathVariable Integer recipeId, @RequestBody RateRequest request) {
        hasEatenService.userHasEaten(userId.intValue(), recipeId, request.getFavorites(), request.getStars());
    }

    @PutMapping("/{userId}/recipes/{recipeId}/favorite")
    public void updateFavorite(@PathVariable Long userId, @PathVariable Integer recipeId, @RequestParam Boolean favorites) {
        hasEatenService.updateFavoriteStatus(userId.intValue(), recipeId, favorites);
    }

    @PutMapping("/{userId}/recipes/{recipeId}/stars")
    public void updateStars(@PathVariable Long userId, @PathVariable Integer recipeId, @RequestParam Integer stars) {
        hasEatenService.updateStars(userId.intValue(), recipeId, stars);
    }
}