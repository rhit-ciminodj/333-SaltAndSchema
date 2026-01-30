package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "HasEaten")
public class HasEaten {

    @EmbeddedId
    private HasEatenId id;

    @Column(name = "Favorites", nullable = false)
    private Boolean favorites;

    @Column(name = "Stars")
    private Integer stars;

    public HasEaten() {}

    public HasEaten(HasEatenId id, Boolean favorites, Integer stars) {
        this.id = id;
        this.favorites = favorites;
        this.stars = stars;
    }

    public HasEatenId getId() { return id; }
    public void setId(HasEatenId id) { this.id = id; }

    public Boolean getFavorites() { return favorites; }
    public void setFavorites(Boolean favorites) { this.favorites = favorites; }

    public Integer getStars() { return stars; }
    public void setStars(Integer stars) { this.stars = stars; }
}
