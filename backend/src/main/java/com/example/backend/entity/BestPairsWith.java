package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "BestPairsWith")
public class BestPairsWith {

    @EmbeddedId
    private BestPairsWithId id;

    public BestPairsWith() {}

    public BestPairsWith(BestPairsWithId id) {
        this.id = id;
    }
    public BestPairsWithId getId() { return id; }
    public void setId(BestPairsWithId id) { this.id = id; }
}