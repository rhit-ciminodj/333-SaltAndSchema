package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.Restaurant;
import com.example.backend.repository.RestaurantRepository;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    @PostMapping
    public Response createRestaurant(@RequestBody Restaurant restaurant) {
        try {
            restaurantRepository.newRestaurant(
                    restaurant.getName(),
                    restaurant.getRating(),
                    restaurant.getAddress()
            );
            return new Response("Restaurant created successfully!");
        } catch (Exception e) {
            return new Response("Error: " + e.getMessage());
        }
    }
    public static class Response {
        private String message;

        public Response() {}
        public Response(String message) { this.message = message; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
}
