package com.cse416.fcdistricting;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
    ResponseEntity<String> getStateBoundaries() {
        List<Document> docs = mongoTemplate.findAll(Document.class, "state_boundary");

        if (docs.isEmpty()) {
            System.out.println("No documents found.");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        String jsonArray = "";
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            jsonArray = objectMapper.writeValueAsString(docs);
        } catch (JsonProcessingException e) {
            System.out.println("Conversion to JSON went wrong");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(jsonArray, HttpStatus.OK);
    }

    @GetMapping("/state-boundary")
    ResponseEntity<String> getStateBoundary(@RequestParam("id") int id) {
        Query query = new Query(Criteria.where("_id").is(id));
        Document doc = mongoTemplate.findOne(query, Document.class, "state_boundary");

        if (doc == null) {
            System.out.println("No documents found.");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        String jsonForm = doc.toJson();

        return new ResponseEntity<>(jsonForm, HttpStatus.OK);
    }

    @GetMapping("/state")
    ResponseEntity<String> getState(@RequestParam("state") String state) {
        Query query = new Query(Criteria.where("name").is(state));
        Document doc = mongoTemplate.findOne(query, Document.class, "state");

        if (doc == null) {
            System.out.println("No documents found.");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        String jsonForm = doc.toJson();

        return new ResponseEntity<>(jsonForm, HttpStatus.OK);
    }

    @GetMapping("/default-plan")
    ResponseEntity<String> getDefaultPlan(@RequestParam("id") int id) {
        Query query = new Query(Criteria.where("_id").is(id));
        Document doc = mongoTemplate.findOne(query, Document.class, "default_plan");

        if (doc == null) {
            System.out.println("No documents found.");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        String jsonForm = doc.toJson();

        return new ResponseEntity<>(jsonForm, HttpStatus.OK);
    }

    @GetMapping("/ensembles")
    ResponseEntity<String> getEnsembles(@RequestParam("ids") List<Integer> ids) {
        Query query = new Query(Criteria.where("_id").in(ids));
        List<Document> docs = mongoTemplate
                .find(query, Document.class, "ensemble");

        if (docs.isEmpty()) {
            System.out.println("No documents found.");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        String jsonArray = "";
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            jsonArray = objectMapper.writeValueAsString(docs);
        } catch (JsonProcessingException e) {
            System.out.println("Conversion to JSON went wrong");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(jsonArray, HttpStatus.OK);
    }

    @GetMapping("/clusters")
    ResponseEntity<String> getClusters(@RequestParam("ids") List<Integer> ids) {
        Query query = new Query(Criteria.where("_id").in(ids));
        List<Document> docs = mongoTemplate
                .find(query, Document.class, "cluster");

        if (docs.isEmpty()) {
            System.out.println("No documents found.");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        String jsonArray = "";
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            jsonArray = objectMapper.writeValueAsString(docs);
        } catch (JsonProcessingException e) {
            System.out.println("Conversion to JSON went wrong.");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(jsonArray, HttpStatus.OK);
    }

    @GetMapping("/cluster-points")
    ResponseEntity<String> getClusterPoints(@RequestParam("ids") List<Integer> ids) {
        Query query = new Query(Criteria.where("_id").in(ids));
        List<Document> docs = mongoTemplate
                .find(query, Document.class, "cluster");

        if (docs.isEmpty()) {
            System.out.println("No documents found.");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        int maxDistrictPlans = docs.stream()
                .mapToInt(doc -> doc.getList("dpIds", Object.class).size())
                .max()
                .orElse(0);

        List<Map<String, Object>> points = docs.stream()
                .map(doc -> {
                    int id = doc.getInteger("_id");
                    double x = 0; /* Measure 1 */
                    double y = 0; /* Measure 2 */
                    double size = (double)doc.getList("dpIds", Object.class).size() / maxDistrictPlans;

                    Map<String, Object> point = new HashMap<>();
                    point.put("id", id);
                    point.put("x", x);
                    point.put("y", y);
                    point.put("size", size);

                    return point;
                })
                .toList();

        String jsonArray;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            jsonArray = objectMapper.writeValueAsString(points);
        } catch (JsonProcessingException e) {
            System.out.println("Conversion to JSON went wrong.");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(jsonArray, HttpStatus.OK);
    }

    @GetMapping("/district-plan-points")
    ResponseEntity<String> getDistrictPlanPoints(@RequestParam("ids") List<Integer> ids) {
        Query query = new Query(Criteria.where("_id").in(ids));
        List<Document> docs = mongoTemplate
                .find(query, Document.class, "district_plan");

        if (docs.isEmpty()) {
            System.out.println("No documents found.");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<Map<String, Object>> points = docs.stream()
                .map(doc -> {
                    int id = doc.getInteger("_id");
                    double x = 0; /* Measure 1 */
                    double y = 0; /* Measure 2 */
                    boolean availability = false;

                    Map<String, Object> point = new HashMap<>();
                    point.put("id", id);
                    point.put("x", x);
                    point.put("y", y);
                    point.put("availability", availability);

                    return point;
                })
                .toList();

        String jsonArray;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            jsonArray = objectMapper.writeValueAsString(points);
        } catch (JsonProcessingException e) {
            System.out.println("Conversion to JSON went wrong.");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(jsonArray, HttpStatus.OK);
    }

    @GetMapping("/plan")
    Map<String, Object> getPlan(@RequestParam("ids") List<Integer> ids) {
        org.bson.Document result = mongoTemplate.getCollection("plan").find().first();

        return result;
    }

    @GetMapping("/plans")
    Map<String, Object> getPlans(@RequestParam("ids") List<Integer> ids) {
        org.bson.Document result = mongoTemplate.getCollection("plan").find().first();

        return result;
    }
}
