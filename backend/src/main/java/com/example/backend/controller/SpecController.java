package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.backend.entity.db.SpecEntity;
import com.example.backend.service.SpectService.*;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api")
public class SpecController {

    @Autowired
    private SpecService specService;

    @GetMapping("/getAllSpecs")
    public List<SpecEntity> getAllSpecs(@RequestParam("userId") String userId) {
        return specService.getAllSpecs(userId);
    }

    @PostMapping("/addSpecs")
    public void addSpec(@RequestBody SpecEntity specEntity) {
        specService.insertSpec(specEntity);
    }
}
