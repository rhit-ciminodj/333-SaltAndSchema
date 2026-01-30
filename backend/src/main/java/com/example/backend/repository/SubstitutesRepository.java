package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.Substitutes;
import com.example.backend.entity.SubstitutesId;

@Repository
public interface SubstitutesRepository
        extends JpaRepository<Substitutes, SubstitutesId> {

    @Procedure(procedureName = "addSubstituteToIngredient")
    void addSubstituteToIngredient(
        @Param("IngredientID") Integer ingredientId,
        @Param("SubstituteID") Integer substituteId
    );
}

