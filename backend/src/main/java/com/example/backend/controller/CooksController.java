package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.Cooks;
import com.example.backend.service.CooksService;

@RestController
@RequestMapping("/api/cooks")
public class CooksController {

    @Autowired
    private CooksService cooksService;

    @GetMapping("/restaurant/{restaurantId}")
    public List<Cooks> getRecipesByRestaurant(@PathVariable Long restaurantId) {
        return cooksService.getRecipesByRestaurant(restaurantId);
    }

    @PostMapping("/restaurant/{restaurantId}/recipe/{recipeId}/price/{price}")
    public ResponseEntity<String> addRecipeToRestaurant(@PathVariable Long restaurantId, @PathVariable Long recipeId, @PathVariable Double price) {
        try {
            cooksService.addRecipeToRestaurant(recipeId, restaurantId, price);
            return ResponseEntity.ok("Recipe linked to restaurant successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
}
