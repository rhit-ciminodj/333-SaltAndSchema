package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;

import com.example.backend.entity.SoldBy;
import com.example.backend.entity.SoldById;

@Repository
public interface SoldByRepository
        extends JpaRepository<SoldBy, SoldById> {

    @Procedure(procedureName = "soldByStore")
    void soldByStore(
        @Param("IngredientID") Integer ingredientId,
        @Param("StoreID") Integer storeId,
        @Param("Price") BigDecimal price
    );
}
