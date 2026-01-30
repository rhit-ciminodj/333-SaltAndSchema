package com.example.backend.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class HasEatenId implements Serializable {

    @Column(name = "UserID")
    private Integer userId;

    @Column(name = "RecipeID")
    private Integer recipeId;

    public HasEatenId() {}

    public HasEatenId(Integer userId, Integer recipeId) {
        this.userId = userId;
        this.recipeId = recipeId;
    }

    public Integer getUserId() { return userId; }
    public Integer getRecipeId() { return recipeId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof HasEatenId)) return false;
        HasEatenId that = (HasEatenId) o;
        return Objects.equals(userId, that.userId)
            && Objects.equals(recipeId, that.recipeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, recipeId);
    }
}
