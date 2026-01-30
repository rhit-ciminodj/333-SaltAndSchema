package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.Recipe;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer> {

    @Procedure(procedureName = "newRecipe")
    void newRecipe(
        @Param("Name") String name,
        @Param("ServingSize") Short servingSize,
        @Param("UserAuthorID") Integer userAuthorId,
        @Param("RestaurantAuthorID") Integer restaurantAuthorId,
        @Param("TypeOfDish") String typeOfDish,
        @Param("Calories") Short calories,
        @Param("Description") String description,
        @Param("TimeToCook") Short timeToCook,
        @Param("InstructionSet") String instructionSet
    );

    @Procedure(procedureName = "getRecipeStars")
    Double getRecipeStars(@Param("recipeID") Integer recipeId);
}

