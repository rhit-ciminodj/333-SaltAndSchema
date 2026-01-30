package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "TypeOf")
public class TypeOf {

    @EmbeddedId
    private TypeOfId id;

    public TypeOf() {}

    public TypeOf(TypeOfId id) {
        this.id = id;
    }

    public TypeOfId getId() { return id; }
    public void setId(TypeOfId id) { this.id = id; }
}
