package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "UsingEquip")
public class UsingEquip {

    @EmbeddedId
    private UsingEquipId id;

    public UsingEquip() {}

    public UsingEquip(UsingEquipId id) {
        this.id = id;
    }
    public UsingEquipId getId() { return id; }
    public void setId(UsingEquipId id) { this.id = id; }
    
}
    

