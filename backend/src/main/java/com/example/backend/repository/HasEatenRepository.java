package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.HasEaten;
import com.example.backend.entity.HasEatenId;

@Repository
public interface HasEatenRepository
        extends JpaRepository<HasEaten, HasEatenId> {

    @Procedure(procedureName = "userHasEaten")
    void userHasEaten(
        @Param("UserID") Integer userId,
        @Param("RecipeID") Integer recipeId,
        @Param("Favorites") Boolean favorites,
        @Param("Stars") Integer stars
    );
}
