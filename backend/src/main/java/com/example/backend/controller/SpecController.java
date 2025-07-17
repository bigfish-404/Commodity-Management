package com.example.backend.controller;

import com.example.backend.entity.db.SpecEntity;
import com.example.backend.service.SpectService.SpecService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

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

    @PostMapping("/updateSpecs")
    public void update(@RequestBody SpecEntity spec) {
        specService.update(spec);
    }

    @PostMapping("/deleteSpecs")
    public void delete(@RequestBody Map<String, Object> param) {
        Long id = Long.valueOf(param.get("id").toString());
        specService.delete(id);
    }

}
