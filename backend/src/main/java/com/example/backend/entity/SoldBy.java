package com.example.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "SoldBy")
public class SoldBy {

    @EmbeddedId
    private SoldById id;

    @Column(name = "Price", nullable = false)
    private BigDecimal price;

    public SoldBy() {}

    public SoldBy(SoldById id, BigDecimal price) {
        this.id = id;
        this.price = price;
    }
    public SoldById getId() { return id; }
    public void setId(SoldById id) { this.id = id; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
}



