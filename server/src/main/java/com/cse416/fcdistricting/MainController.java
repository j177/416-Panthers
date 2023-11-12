package com.cse416.fcdistricting;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
public class MainController {
    @Autowired
    private final MongoTemplate mongoTemplate;

    @Autowired
    public MainController(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @GetMapping("/state-boundaries")
    Map<String, Object> stateBoundaries() {
        org.bson.Document result = mongoTemplate.getCollection("state_boundaries").find().first();

        System.out.println(result);
        return result;
    }

    @GetMapping("/state")
    Map<String, Object> state(@RequestParam("state") String state) {
        System.out.println(state);
        org.bson.Document result = mongoTemplate.getCollection("state").find().first();

        return result;
    }

    @GetMapping("/default-plan")
    Map<String, Object> stateBoundary(@RequestParam("id") int id) {
        System.out.println(id);
        org.bson.Document result = mongoTemplate.getCollection("default_plan").find().first();

        return result;
    }

    @GetMapping("/ensembles")
    Map<String, Object> ensembles(@RequestParam("ids") int[] ids) {
        org.bson.Document result = mongoTemplate.getCollection("ensemble").find().first();

        return result;
    }

    @GetMapping("/clusters")
    Map<String, Object> clusters(@RequestParam("ids") int[] ids) {
        org.bson.Document result = mongoTemplate.getCollection("cluster").find().first();

        return result;
    }

    @GetMapping("/district-plans")
    Map<String, Object> districtPlans(@RequestParam("ids") int[] ids) {
        org.bson.Document result = mongoTemplate.getCollection("district_plan").find().first();

        return result;
    }

    @GetMapping("/plan")
    Map<String, Object> plan(@RequestParam("id") int[] ids) {
        org.bson.Document result = mongoTemplate.getCollection("plan").find().first();

        return result;
    }
}
