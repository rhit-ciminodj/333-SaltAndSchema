package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Cuisine")
public class Cuisine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CuisineID")
    private Integer cuisineId;

    @Column(name = "Name", nullable = false, length = 20)
    private String name;

    @Column(name = "Description", nullable = true, length = 200)
    private String description;

    public Integer getCuisineId() { return cuisineId; }
    public void setCuisineId(Integer cuisineId) { this.cuisineId = cuisineId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
