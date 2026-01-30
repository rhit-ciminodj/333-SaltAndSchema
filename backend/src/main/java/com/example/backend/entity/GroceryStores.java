package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "GroceryStores")
public class GroceryStores {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "GroceryStoreID")
    private Integer groceryStoreId;

    @Column(name = "Name", nullable = false, length = 20)
    private String name;

    @Column(name = "Address", nullable = false, length = 50)
    private String address;

    public Integer getGroceryStoreId() { return groceryStoreId; }
    public void setGroceryStoreId(Integer groceryStoreId) { this.groceryStoreId = groceryStoreId ; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}

