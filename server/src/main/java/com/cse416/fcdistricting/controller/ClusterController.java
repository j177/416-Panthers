package com.cse416.fcdistricting.controller;

import com.cse416.fcdistricting.model.Cluster;
import com.cse416.fcdistricting.repository.ClusterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ClusterController {

    @Autowired
    private ClusterRepository clusterRepository;

    @PostMapping("/cluster")
    Cluster newCluster(@RequestBody Cluster newCluster) {
        return clusterRepository.save(newCluster);
    }

    @GetMapping("/clusters")
    List<Cluster> getAllClusters() {
        return clusterRepository.findAll();
    }
}
