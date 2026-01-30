package com.example.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "Cooks")
public class Cooks {

    @EmbeddedId
    private CooksId id;

    @Column(name = "CostOfItem")
    private BigDecimal costOfItem;

    public Cooks() {}

    public Cooks(CooksId id, BigDecimal costOfItem) {
        this.id = id;
        this.costOfItem = costOfItem;
    }

    public CooksId getId() { return id; }
    public void setId(CooksId id) { this.id = id; }

    public BigDecimal getCostOfItem() { return costOfItem; }
    public void setCostOfItem(BigDecimal costOfItem) { this.costOfItem = costOfItem; }
}
