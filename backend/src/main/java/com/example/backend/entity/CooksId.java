package com.example.backend.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class CooksId implements Serializable {

    @Column(name = "RestaurantID")
    private Integer restaurantId;

    @Column(name = "RecipeID")
    private Integer recipeId;

    public CooksId() {}

    public CooksId(Integer restaurantId, Integer recipeId) {
        this.restaurantId = restaurantId;
        this.recipeId = recipeId;
    }

    public Integer getRestaurantId() { return restaurantId; }
    public Integer getRecipeId() { return recipeId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CooksId)) return false;
        CooksId that = (CooksId) o;
        return Objects.equals(restaurantId, that.restaurantId)
            && Objects.equals(recipeId, that.recipeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(restaurantId, recipeId);
    }
}
