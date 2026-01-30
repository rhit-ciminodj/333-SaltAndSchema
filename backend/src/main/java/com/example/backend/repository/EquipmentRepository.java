package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.Equipment;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Integer> {

    @Procedure(procedureName = "newEquipment")
    void newEquipment(
        @Param("Name") String name,
        @Param("Description") String description
    );
}
