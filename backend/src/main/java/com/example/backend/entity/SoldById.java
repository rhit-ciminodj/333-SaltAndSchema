package com.example.backend.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class SoldById implements Serializable {

    @Column(name = "IngredientID")
    private Integer ingredientId;

    @Column(name = "StoreID")
    private Integer storeId;

    public SoldById() {}

    public SoldById(Integer ingredientId, Integer storeId) {
        this.ingredientId = ingredientId;
        this.storeId = storeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SoldById)) return false;
        SoldById that = (SoldById) o;
        return Objects.equals(ingredientId, that.ingredientId)
            && Objects.equals(storeId, that.storeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ingredientId, storeId);
    }
}
