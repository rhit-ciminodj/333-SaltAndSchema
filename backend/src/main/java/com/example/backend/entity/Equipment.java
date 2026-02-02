package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Equipment")
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EquipID")
    private Integer equipmentId;

    @Column(name = "Name", nullable = false, length = 20)
    private String name;

    @Column(name = "Description", nullable = true, length = 200)
    private String description;

    public Integer getEquipmentId() { return equipmentId; }
    public void setEquipmentId(Integer equipmentId) { this.equipmentId = equipmentId ; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}

