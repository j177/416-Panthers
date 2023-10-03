package com.cse416.fcdistricting.controller;

import com.cse416.fcdistricting.model.District;
import com.cse416.fcdistricting.repository.DistrictRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DistrictController {

    @Autowired
    private DistrictRepository districtRepository;

    @PostMapping("/district")
    District newDistrict(@RequestBody District newDistrict) {
        return districtRepository.save(newDistrict);
    }

    @GetMapping("/districts")
    List<District> getAllDistricts() {
        return districtRepository.findAll();
    }
}
