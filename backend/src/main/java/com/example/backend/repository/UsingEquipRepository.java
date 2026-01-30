package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.UsingEquip;
import com.example.backend.entity.UsingEquipId;

@Repository
public interface UsingEquipRepository
        extends JpaRepository<UsingEquip, UsingEquipId> {

    @Procedure(procedureName = "addEquipToRecipe")
    void addEquipToRecipe(
        @Param("RecipeID") Integer recipeId,
        @Param("EquipmentID") Integer equipmentId
    );
}
