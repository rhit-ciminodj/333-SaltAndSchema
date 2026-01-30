package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Substitutes")
public class Substitutes {

    @EmbeddedId
    private SubstitutesId id;

    public Substitutes() {}

    public Substitutes(SubstitutesId id) {
        this.id = id;
    }
    public SubstitutesId getId() { return id; }
    public void setId(SubstitutesId id) { this.id = id; }
}



