package com.example.backend.repository;

import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Procedure(procedureName = "newUser")
    void newUser(
        @Param("Username") String username,
        @Param("Address") String address
    );

    @Procedure(procedureName = "DeleteUser")
    void deleteUser(@Param("UserID") Integer userId);

    @Procedure(procedureName = "changeUsername")
    void changeUsername(
        @Param("userID") Integer userId,
        @Param("newUsername") String newUsername
    );
}

