package com.cse416.fcdistricting.repository;

import com.cse416.fcdistricting.model.District;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DistrictRepository extends JpaRepository<District, Integer> {
}
