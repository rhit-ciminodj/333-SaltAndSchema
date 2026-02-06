package com.example.backend.dto;

public class RateRequest {
    private Boolean favorites;
    private Integer stars;

    public RateRequest() {}

    public RateRequest(Boolean favorites, Integer stars) {
        this.favorites = favorites;
        this.stars = stars;
    }

    public Boolean getFavorites() {
        return favorites;
    }

    public void setFavorites(Boolean favorites) {
        this.favorites = favorites;
    }

    public Integer getStars() {
        return stars;
    }

    public void setStars(Integer stars) {
        this.stars = stars;
    }
}
