package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.DeliveryMethodEntity;
import com.example.backend.service.DeliveryMethod.DeliveryMethodService;

@RequestMapping("/api")
@RestController
public class DeliveryMethodController {

    @Autowired
    private DeliveryMethodService deliveryMethodService;

    @GetMapping("/getAllDeliveryMethod")
    public List<DeliveryMethodEntity> getAll(){
        return deliveryMethodService.getAllDeliveryMethod();
    }

}
