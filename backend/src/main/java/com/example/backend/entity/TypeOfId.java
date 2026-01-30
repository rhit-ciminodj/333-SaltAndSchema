package com.example.backend.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class TypeOfId implements Serializable {

    @Column(name = "CuisineID")
    private Integer cuisineId;

    @Column(name = "RecipeID")
    private Integer recipeId;

    public TypeOfId() {}

    public TypeOfId(Integer cuisineId, Integer recipeId) {
        this.cuisineId = cuisineId;
        this.recipeId = recipeId;
    }

    public Integer getCuisineId() { return cuisineId; }
    public Integer getRecipeId() { return recipeId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TypeOfId)) return false;
        TypeOfId that = (TypeOfId) o;
        return Objects.equals(cuisineId, that.cuisineId)
            && Objects.equals(recipeId, that.recipeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cuisineId, recipeId);
    }
}
