package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.GroceryStores;

@Repository
public interface GroceryStoreRepository extends JpaRepository<GroceryStores, Integer> {

    @Procedure(procedureName = "newGroceryStore")
    void newGroceryStore(
        @Param("Name") String name,
        @Param("Address") String address
    );
}
