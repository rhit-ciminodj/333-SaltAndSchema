package com.example.backend.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "GroceryStoreOwners")
public class GroceryStoreOwners {

    @EmbeddedId
    private GroceryStoreOwnersID id;

    public GroceryStoreOwners() {}

    public GroceryStoreOwners(GroceryStoreOwnersID id) {
        this.id = id;
    }

    public GroceryStoreOwnersID getId() {
        return id;
    }

    public void setId(GroceryStoreOwnersID id) {
        this.id = id;
    }
    
}

