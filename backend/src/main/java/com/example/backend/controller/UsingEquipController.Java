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
    private UsingEquipService UsingEquipService;

    @PostMapping("/{RecipeID}/{EquipID}")
    public void AddUsingEquip(@PathVariable Long RecipeID, @PathVariable Long EquipID) {
        this.UsingEquipService.AddUsingEquip(RecipeID, EquipID);
    }
}
