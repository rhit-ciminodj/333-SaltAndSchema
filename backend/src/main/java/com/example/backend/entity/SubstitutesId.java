package com.example.backend.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class SubstitutesId implements Serializable {

    @Column(name = "IngredientID")
    private Integer ingredientId;

    @Column(name = "SubstituteID")
    private Integer substituteId;

    public SubstitutesId() {}

    public SubstitutesId(Integer ingredientId, Integer substituteId) {
        this.ingredientId = ingredientId;
        this.substituteId = substituteId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SubstitutesId)) return false;
        SubstitutesId that = (SubstitutesId) o;
        return Objects.equals(ingredientId, that.ingredientId)
            && Objects.equals(substituteId, that.substituteId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ingredientId, substituteId);
    }
}
