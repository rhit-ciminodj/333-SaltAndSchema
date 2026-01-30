package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.TypeOf;
import com.example.backend.entity.TypeOfId;

@Repository
public interface TypeOfRepository
        extends JpaRepository<TypeOf, TypeOfId> {

    @Procedure(procedureName = "addCuisineToRecipe")
    void addCuisineToRecipe(
        @Param("CuisineID") Integer cuisineId,
        @Param("RecipeID") Integer recipeId
    );
}
