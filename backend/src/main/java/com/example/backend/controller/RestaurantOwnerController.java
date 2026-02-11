package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.RestaurantOwners;
import com.example.backend.service.RestaurantOwnersService;

@RestController
@RequestMapping("/api/restaurantowners")
public class RestaurantOwnerController {
    
    @Autowired
    private RestaurantOwnersService restaurantOwnersService;

    @GetMapping("/{userID}")
    public ResponseEntity<List<RestaurantOwners>> getRestaurantOwnerByID(@PathVariable Long userID) {
        List<RestaurantOwners> restaurantOwners = restaurantOwnersService.getRestaurantOwnerByID(userID);
        if (restaurantOwners != null && !restaurantOwners.isEmpty()) {
            return ResponseEntity.ok(restaurantOwners);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/assign/{userID}/{restaurantID}")
    public ResponseEntity<String> assignRestaurantToOwner(@PathVariable Long userID, @PathVariable Long restaurantID) {
        try {
            restaurantOwnersService.assignRestaurantToOwner(userID, restaurantID);
            return ResponseEntity.ok("Restaurant assigned to owner successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/isowner/{userID}")
    public ResponseEntity<Boolean> isRestaurantOwner(@PathVariable Long userID) {
        try {
            int result = restaurantOwnersService.isRestaurantOwner(userID);
            return ResponseEntity.ok(result > 0);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(false);
        }
    }
}
