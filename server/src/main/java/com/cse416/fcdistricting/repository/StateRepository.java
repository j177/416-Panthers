package com.cse416.fcdistricting.repository;

import com.cse416.fcdistricting.model.State;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StateRepository extends MongoRepository<State, Integer> {

}
