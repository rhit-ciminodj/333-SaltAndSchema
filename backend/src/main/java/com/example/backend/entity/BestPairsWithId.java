package com.example.backend.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class BestPairsWithId implements Serializable {

    @Column(name = "MainRecipeID")
    private Integer mainRecipeId;

    @Column(name = "SideRecipeID")
    private Integer sideRecipeId;

    public BestPairsWithId() {}

    public BestPairsWithId(Integer mainRecipeId, Integer sideRecipeId) {
        this.mainRecipeId = mainRecipeId;
        this.sideRecipeId = sideRecipeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BestPairsWithId)) return false;
        BestPairsWithId that = (BestPairsWithId) o;
        return Objects.equals(mainRecipeId, that.mainRecipeId)
            && Objects.equals(sideRecipeId, that.sideRecipeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(mainRecipeId, sideRecipeId);
    }
}

