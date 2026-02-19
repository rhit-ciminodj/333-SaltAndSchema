package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.Substitutes;
import com.example.backend.service.SubstitutesService;

@RestController
@RequestMapping("/api/substitutes")
public class SubstitutesController {

    @Autowired
    private SubstitutesService substituteService;

    @GetMapping("/{IngredientID}")
    public List<Substitutes> getIngredientSubstitutes(@PathVariable Long IngredientID) {
        return this.substituteService.getIngredientSubstitutes(IngredientID);
    }

    @PostMapping("/{IngredientID}/{SubstituteID}")
    public ResponseEntity<String> newSubstitutes(@PathVariable Long IngredientID, @PathVariable Long SubstituteID) {
        try {
            this.substituteService.newSubstitutes(IngredientID, SubstituteID);
            return ResponseEntity.ok("Substitute added successfully");
        } catch (Exception e) {
            String msg = e.getMessage();
            if (msg != null && (msg.contains("duplicate") || msg.contains("UNIQUE") || msg.contains("PRIMARY"))) {
                return ResponseEntity.badRequest().body("This substitute already exists");
            }
            return ResponseEntity.badRequest().body("Error: " + msg);
        }
    }
}
