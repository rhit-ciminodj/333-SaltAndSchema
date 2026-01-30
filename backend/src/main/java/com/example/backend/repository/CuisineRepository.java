package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.Cuisine;

@Repository
public interface CuisineRepository extends JpaRepository<Cuisine, Integer> {

    @Procedure(procedureName = "newCuisine")
    void newCuisine(
        @Param("Name") String name,
        @Param("Description") String description
    );
}
