package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "UserAuth")
public class UserAuth {

    @Id
    @Column(name = "UserID")
    private Integer userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "UserID")
    private User user;

    @Column(name = "PasswordHash", nullable = false)
    private byte[] passwordHash;

    @Column(name = "Salt", nullable = false)
    private byte[] salt;

    public UserAuth() {}

    public UserAuth(User user, byte[] passwordHash, byte[] salt) {
        this.user = user;
        this.passwordHash = passwordHash;
        this.salt = salt;
    }
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public byte[] getPasswordHash() { return passwordHash; }
    public void setPasswordHash(byte[] passwordHash) { this.passwordHash = passwordHash; }
    public byte[] getSalt() { return salt; }
    public void setSalt(byte[] salt) { this.salt = salt; }
}
