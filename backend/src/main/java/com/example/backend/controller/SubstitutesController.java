package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
    public void newSubstitutes(@PathVariable Long IngredientID, @PathVariable Long SubstituteID) {
        this.substituteService.newSubstitutes(IngredientID, SubstituteID);
    }
    
}
