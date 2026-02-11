package com.example.backend.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "RestaurantOwners")
public class RestaurantOwners {

    @EmbeddedId
    private RestaurantOwnersID id;

    public RestaurantOwners() {}

    public RestaurantOwners(RestaurantOwnersID id) {
        this.id = id;
    }

    public RestaurantOwnersID getId() {
        return id;
    }

    public void setId(RestaurantOwnersID id) {
        this.id = id;
    }
    
}
