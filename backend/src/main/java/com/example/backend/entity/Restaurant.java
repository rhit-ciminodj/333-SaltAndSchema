package com.example.backend.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name = "Restaurant")
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RestID")
    private Integer restaurantId;

    @Column(name = "Name", nullable = false, length = 50)
    private String name;

    @Column(
        name = "Rating",
        precision = 3, // e.g. 4.5, 10.0
        scale = 2
    )
    private BigDecimal rating;

    @Column(name = "Address", nullable = false, length = 50)
    private String address;

    public Integer getRestaurantId() { return restaurantId; }
    public void setRestaurantId(Integer restaurantId) { this.restaurantId = restaurantId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public BigDecimal getRating() { return rating; }
    public void setRating(BigDecimal rating) { this.rating = rating; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}
