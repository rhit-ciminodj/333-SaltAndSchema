package com.example.backend.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UsingIngredientsId implements Serializable {

    @Column(name = "IngredientID")
    private Integer ingredientId;

    @Column(name = "RecipeID")
    private Integer recipeId;

    public UsingIngredientsId() {}

    public UsingIngredientsId(Integer ingredientId, Integer recipeId) {
        this.ingredientId = ingredientId;
        this.recipeId = recipeId;
    }

    public Integer getIngredientId() { return ingredientId; }
    public void setIngredientId(Integer ingredientId) { this.ingredientId = ingredientId; }
    public Integer getRecipeId() { return recipeId; }
    public void setRecipeId(Integer recipeId) { this.recipeId = recipeId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UsingIngredientsId)) return false;
        UsingIngredientsId that = (UsingIngredientsId) o;
        return Objects.equals(ingredientId, that.ingredientId)
            && Objects.equals(recipeId, that.recipeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ingredientId, recipeId);
    }
}
