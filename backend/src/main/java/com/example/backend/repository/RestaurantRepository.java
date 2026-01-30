package com.example.backend.repository;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.Restaurant;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {

    // Calls the stored procedure newRestaurant
    @Procedure(procedureName = "newRestaurant")
    void newRestaurant(
            @Param("Name") String name,
            @Param("Rating") BigDecimal rating,
            @Param("Address") String address
    );
}
