package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.BestPairsWith;
import com.example.backend.entity.BestPairsWithId;

@Repository
public interface BestPairsWithRepository
        extends JpaRepository<BestPairsWith, BestPairsWithId> {

    @Procedure(procedureName = "newPair")
    void newPair(
        @Param("MainID") Integer mainId,
        @Param("SideID") Integer sideId
    );
}
