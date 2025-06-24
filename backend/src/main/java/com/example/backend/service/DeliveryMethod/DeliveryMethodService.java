package com.example.backend.service.DeliveryMethod;

import java.util.List;

import com.example.backend.entity.db.DeliveryMethodEntity;

public interface DeliveryMethodService {

    List<DeliveryMethodEntity> getAllDeliveryMethod(String userId);
}
