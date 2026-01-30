package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "UsingIngredients")
public class UsingIngredients {

    @EmbeddedId
    private UsingIngredientsId id;

    @Column(name = "Quantity", nullable = false)
    private Short quantity;

    public UsingIngredients() {}

    public UsingIngredients(UsingIngredientsId id, Short quantity) {
        this.id = id;
        this.quantity = quantity;
    }

    public UsingIngredientsId getId() { return id; }
    public void setId(UsingIngredientsId id) { this.id = id; }
    public Short getQuantity() { return quantity; }
    public void setQuantity(Short quantity) { this.quantity = quantity; }
}
    

