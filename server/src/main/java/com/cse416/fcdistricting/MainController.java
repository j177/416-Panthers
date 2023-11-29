package com.cse416.fcdistricting;

import java.util.List;
import java.util.Map;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

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
    ResponseEntity<List<Document>> stateBoundaries() {
        List<Document> docs = mongoTemplate
                .findAll(Document.class, "state_boundary");

        if (docs.isEmpty()) {
            System.out.println("No documents found.");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(docs, HttpStatus.OK);
    }

    @GetMapping("/state-boundary")
    ResponseEntity<Document> stateBoundary(@RequestParam("id") int id) {
        System.out.println(id);

        Query query = new Query(Criteria.where("_id").is(id));
        Document doc = mongoTemplate.findOne(query, Document.class, "state_boundary");

        if (doc == null) {
            System.out.println("No documents found.");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(doc, HttpStatus.OK);
    }

    @GetMapping("/state")
    ResponseEntity<Document> state(@RequestParam("state") String state) {
        System.out.println(state);

        Query query = new Query(Criteria.where("name").is(state));
        Document doc = mongoTemplate.findOne(query, Document.class, "state");

        if (doc == null) {
            System.out.println("No documents found.");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(doc, HttpStatus.OK);
    }

    @GetMapping("/default-plan")
    ResponseEntity<Document> defaultPlan(@RequestParam("id") int id) {
        System.out.println(id);

        Query query = new Query(Criteria.where("_id").is(id));
        Document doc = mongoTemplate.findOne(query, Document.class, "default_plan");

        if (doc == null) {
            System.out.println("No documents found.");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(doc, HttpStatus.OK);
    }

    @GetMapping("/ensembles")
    ResponseEntity<List<Document>> ensembles(@RequestParam("ids") List<Integer> ids) {
        for (int id : ids) {
            System.out.println(id);
        }

        Query query = new Query(Criteria.where("_id").in(ids));
        List<Document> docs = mongoTemplate
                .find(query, Document.class, "ensemble");

        if (docs.isEmpty()) {
            System.out.println("No documents found.");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(docs, HttpStatus.OK);
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
