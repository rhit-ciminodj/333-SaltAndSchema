package com.example.backend.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class GroceryStoreOwnersID implements Serializable {

    @Column(name = "UserID")
    private Integer userId;

    @Column(name = "StoreID")
    private Integer storeId;

    public GroceryStoreOwnersID() {}

    public GroceryStoreOwnersID(Integer userId, Integer storeId) {
        this.userId = userId;
        this.storeId = storeId;
    }

    public Integer getUserId() { return userId; }
    public Integer getStoreId() { return storeId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof GroceryStoreOwnersID)) return false;
        GroceryStoreOwnersID that = (GroceryStoreOwnersID) o;
        return Objects.equals(userId, that.userId)
            && Objects.equals(storeId, that.storeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, storeId);
    }
    
}
