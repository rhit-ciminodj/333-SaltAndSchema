package com.example.backend.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UsingEquipId implements Serializable {

    @Column(name = "RecipeID")
    private Integer recipeId;

    @Column(name = "EquipmentID")
    private Integer equipmentId;

    public UsingEquipId() {}

    public UsingEquipId(Integer recipeId, Integer equipmentId) {
        this.recipeId = recipeId;
        this.equipmentId = equipmentId;
    }

    public Integer getRecipeId() { return recipeId; }
    public void setRecipeId(Integer recipeId) { this.recipeId = recipeId; }
    public Integer getEquipmentId() { return equipmentId; }
    public void setEquipmentId(Integer equipmentId) { this.equipmentId = equipmentId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UsingEquipId)) return false;
        UsingEquipId that = (UsingEquipId) o;
        return Objects.equals(recipeId, that.recipeId)
            && Objects.equals(equipmentId, that.equipmentId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(recipeId, equipmentId);
    }
}
