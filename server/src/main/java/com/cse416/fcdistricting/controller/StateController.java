package com.cse416.fcdistricting.controller;

import com.cse416.fcdistricting.model.State;
import com.cse416.fcdistricting.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StateController {

    @Autowired
    private StateRepository stateRepository;

    @PostMapping("/state")
    State newState(@RequestBody State newState) {
        return stateRepository.save(newState);
    }
}
