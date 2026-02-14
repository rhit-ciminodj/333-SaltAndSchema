package com.example.backend.dto;

public class RecipeMatchRequest {
    private Integer recipeId;
    private String name;
    private Short servingSize;
    private Integer userAuthorId;
    private Integer restaurantAuthorId;
    private String typeOfDish;
    private Short calories;
    private String description;
    private Short timeToCook;
    private String instructionSet;
    private Integer matchedCount;
    private Integer totalCount;
    private Double matchPercent;

    public Integer getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Integer recipeId) {
        this.recipeId = recipeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Short getServingSize() {
        return servingSize;
    }

    public void setServingSize(Short servingSize) {
        this.servingSize = servingSize;
    }

    public Integer getUserAuthorId() {
        return userAuthorId;
    }

    public void setUserAuthorId(Integer userAuthorId) {
        this.userAuthorId = userAuthorId;
    }

    public Integer getRestaurantAuthorId() {
        return restaurantAuthorId;
    }

    public void setRestaurantAuthorId(Integer restaurantAuthorId) {
        this.restaurantAuthorId = restaurantAuthorId;
    }

    public String getTypeOfDish() {
        return typeOfDish;
    }

    public void setTypeOfDish(String typeOfDish) {
        this.typeOfDish = typeOfDish;
    }

    public Short getCalories() {
        return calories;
    }

    public void setCalories(Short calories) {
        this.calories = calories;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Short getTimeToCook() {
        return timeToCook;
    }

    public void setTimeToCook(Short timeToCook) {
        this.timeToCook = timeToCook;
    }

    public String getInstructionSet() {
        return instructionSet;
    }

    public void setInstructionSet(String instructionSet) {
        this.instructionSet = instructionSet;
    }

    public Integer getMatchedCount() {
        return matchedCount;
    }

    public void setMatchedCount(Integer matchedCount) {
        this.matchedCount = matchedCount;
    }

    public Integer getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(Integer totalCount) {
        this.totalCount = totalCount;
    }

    public Double getMatchPercent() {
        return matchPercent;
    }

    public void setMatchPercent(Double matchPercent) {
        this.matchPercent = matchPercent;
    }
}
