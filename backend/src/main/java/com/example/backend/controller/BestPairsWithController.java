package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.BestPairsWith;
import com.example.backend.service.BestPairsWithService;

@RestController
@RequestMapping("/api/best-pairs-with")
public class BestPairsWithController {

    @Autowired
    private BestPairsWithService bestPairsWithService;

    @GetMapping("/{MainRecipeID}")
    public List<BestPairsWith> getBestPairsWith(@PathVariable Long MainRecipeID) {
        return this.bestPairsWithService.getBestPairsWith(MainRecipeID);
    }

    @PostMapping("/{MainRecipeID}/{SideRecipeID}")
    public void addNewBestPairsWith(@PathVariable Long MainRecipeID, @PathVariable Long SideRecipeID) {
        this.bestPairsWithService.createBestPairsWith(MainRecipeID, SideRecipeID);
    }
}