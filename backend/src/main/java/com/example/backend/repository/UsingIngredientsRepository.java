package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.UsingIngredients;
import com.example.backend.entity.UsingIngredientsId;

@Repository
public interface UsingIngredientsRepository
        extends JpaRepository<UsingIngredients, UsingIngredientsId> {

    @Procedure(procedureName = "addIngredientToRecipe")
    void addIngredientToRecipe(
        @Param("IngredientID") Integer ingredientId,
        @Param("RecipeID") Integer recipeId,
        @Param("Quantity") Short quantity
    );
}

