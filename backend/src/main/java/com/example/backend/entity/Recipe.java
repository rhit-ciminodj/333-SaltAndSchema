package com.example.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Recipe")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RecipeID")
    private Integer recipeId;

    @Column(name = "Name", nullable = false, length = 20)
    private String name;

    @Column(name = "ServingSize", nullable = true)
    private Short servingSize;

    @Column(name = "UserAuthorID",
        nullable = true)
    private int userAuthorId;

    @Column(name = "RestaurantAuthorId",
        nullable = true)
    private int restaurantAuthorId;
    
    @Column(name = "TypeOfDish",
        nullable = true, length = 10
    )
    private String typeOfDish;

    @Column(name = "Calories",
        nullable = true
    )
    private Short calories;

    @Column(name = "Description",
        nullable = true, length = 200
    )
    private String description;

    @Column(name = "TimeToCook",
        nullable = true
    )
    private Short timeToCook;

    @Column(name = "InstructionSet",
        nullable = true, length = 500
    )
    private String instructionSet;

    public Integer getRecipeId() { return recipeId; }
    public void setRecipeId(Integer recipeId) { this.recipeId = recipeId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Short getServingSize() { return servingSize; }
    public void setServingSize(Short servingSize) { this.servingSize = servingSize    ; }
    public int getUserAuthorId() { return userAuthorId; }
    public void setUserAuthorId(int userAuthorId) { this.userAuthorId = userAuthorId; }
    public int getRestaurantAuthorId() { return restaurantAuthorId; }
    public void setRestaurantAuthorId(int restaurantAuthorId) { this.restaurantAuthorId = restaurantAuthorId; }
    public String getTypeOfDish() { return typeOfDish; }
    public void setTypeOfDish(String typeOfDish) { this.typeOfDish = typeOfDish; }
    public Short getCalories() { return calories; }
    public void setCalories(Short calories) { this.calories = calories; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Short getTimeToCook() { return timeToCook; }
    public void setTimeToCook(Short timeToCook) { this.timeToCook = timeToCook; }
    public String getInstructionSet() { return instructionSet; }
    public void setInstructionSet(String instructionSet) { this.instructionSet = instructionSet; }
}

