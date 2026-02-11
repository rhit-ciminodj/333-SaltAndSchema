package com.example.backend.service;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.example.backend.entity.BestPairsWith;
import com.example.backend.entity.BestPairsWithId;


@Service
public class BestPairsWithService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public BestPairsWithService(DataSource datasource) {
        this.jdbcTemplate = new JdbcTemplate(datasource);
    }

    public List<BestPairsWith> getBestPairsWith(Long mainRecipeID) {
        return jdbcTemplate.query("EXEC getBestPairsWith @MainRecipeID=?", (rs, rowNum) -> {
            BestPairsWith bestPairsWith = new BestPairsWith();
            BestPairsWithId id = new BestPairsWithId(rs.getInt("MainRecipeID"), rs.getInt("SideRecipeID"));
            bestPairsWith.setId(id);
            return bestPairsWith;
        }, mainRecipeID);
    }
    
    public void createBestPairsWith(Long mainRecipeID, Long sideRecipeID) {
        jdbcTemplate.update("EXEC newBestPairsWith @MainRecipeID=?, @SideRecipeID=?", mainRecipeID, sideRecipeID);
    }
}
