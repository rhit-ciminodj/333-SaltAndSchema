package com.example.backend.service;

import java.util.Base64;
import java.util.List;
import java.util.Random;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.example.backend.entity.UsingEquip;
import com.example.backend.entity.UsingEquipId;

@Service
public class UsingEquipService {
     private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UsingEquipService(DataSource datasource) {
        this.jdbcTemplate = new JdbcTemplate(datasource);
    }

    public void AddUsingEquip(long RecipeID, long EquipmentID){
        jdbcTemplate.update("EXEC AddUsingEquip @EquipID=? @RecipeID=?", EquipmentID, RecipeID);
    }
}
