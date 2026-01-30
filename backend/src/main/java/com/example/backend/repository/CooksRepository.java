package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;

import com.example.backend.entity.Cooks;
import com.example.backend.entity.CooksId;

@Repository
public interface CooksRepository
        extends JpaRepository<Cooks, CooksId> {

    @Procedure(procedureName = "linkRecipeToRestaurant")
    void linkRecipeToRestaurant(
        @Param("RestID") Integer restaurantId,
        @Param("RecipeID") Integer recipeId,
        @Param("Cost") BigDecimal cost
    );
}
