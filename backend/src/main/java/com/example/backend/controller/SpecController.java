package com.example.backend.controller;

import com.example.backend.entity.SpecEntity;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.backend.service.SpectService.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SpecController {

    @Autowired
    private SpecService specService;

    @GetMapping("/getAllspecs")
    public List<SpecEntity> getAllSpecs() {
        return specService.getAllSpecs();
    }

    @PostMapping("/addSpecs")
    public void addSpec(@RequestBody SpecEntity specEntity) {
        specService.insertSpec(specEntity);
    }
}
