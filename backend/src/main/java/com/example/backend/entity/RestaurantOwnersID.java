package com.example.backend.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class RestaurantOwnersID implements Serializable {

    @Column(name = "UserID")
    private Integer userId;

    @Column(name = "RestaurantID")
    private Integer restaurantId;

    public RestaurantOwnersID() {}

    public RestaurantOwnersID(Integer userId, Integer restaurantId) {
        this.userId = userId;
        this.restaurantId = restaurantId;
    }

    public Integer getUserId() { return userId; }
    public Integer getRestaurantId() { return restaurantId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RestaurantOwnersID)) return false;
        RestaurantOwnersID that = (RestaurantOwnersID) o;
        return Objects.equals(userId, that.userId)
            && Objects.equals(restaurantId, that.restaurantId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, restaurantId);
    }
    
}
