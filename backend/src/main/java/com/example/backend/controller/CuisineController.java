package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.Cuisine;
import com.example.backend.repository.CuisineRepository;

@RestController
@RequestMapping("/api/cuisines")
public class CuisineController {

    @Autowired
    private CuisineRepository cuisineRepository;

    @GetMapping
    public List<Cuisine> getAllCuisines() {
        return cuisineRepository.findAll();
    }

    @PostMapping
    public void createCuisine(@RequestBody Cuisine cuisine) {
        cuisineRepository.newCuisine(
            cuisine.getName(),
            cuisine.getDescription()
        );
    }
}

