package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Ingredients")
public class Ingredients {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IngredientID")
    private Integer ingredientId;

    @Column(name = "Name", nullable = false, length = 20)
    private String name;

    @Column(name = "Description", nullable = true, length = 200)
    private String description;

    public Integer getIngredientId() { return ingredientId; }
    public void setIngredientId(Integer ingredientId) { this.ingredientId = ingredientId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
