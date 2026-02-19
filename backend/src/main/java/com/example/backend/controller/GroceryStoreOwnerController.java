package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.GroceryStoreOwners;
import com.example.backend.service.GroceryStoreOwnersService;

@RestController
@RequestMapping("/api/grocerystoreowners")
public class GroceryStoreOwnerController {
    
    @Autowired
    private GroceryStoreOwnersService groceryStoreOwnersService;

    @GetMapping("/{userID}")
    public ResponseEntity<List<GroceryStoreOwners>> getGroceryStoreOwnerByID(@PathVariable Long userID) {
        List<GroceryStoreOwners> groceryStoreOwners = groceryStoreOwnersService.getGroceryStoreOwnerByID(userID);
        return ResponseEntity.ok(groceryStoreOwners != null ? groceryStoreOwners : List.of());
    }

    @PostMapping("/assign/{userID}/{groceryStoreID}")
    public ResponseEntity<String> assignGroceryStoreToOwner(@PathVariable Long userID, @PathVariable Long groceryStoreID) {
        try {
            groceryStoreOwnersService.assignGroceryStoreToOwner(userID, groceryStoreID);
            return ResponseEntity.ok("Grocery store assigned to owner successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/isowner/{userID}")
    public ResponseEntity<Boolean> isGroceryStoreOwner(@PathVariable Long userID) {
        try {
            int result = groceryStoreOwnersService.isGroceryStoreOwner(userID);
            return ResponseEntity.ok(result > 0);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(false);
        }
    }
}
