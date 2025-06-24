package com.example.backend.service.DeliveryMethod;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.db.DeliveryMethodEntity;
import com.example.backend.mapper.DeliveryMethodMapper;

@Service
public class DeliveryMethodServiceImpl implements DeliveryMethodService{

    @Autowired
    private DeliveryMethodMapper deliveryMethodMapper;

    @Override
    public List<DeliveryMethodEntity> getAllDeliveryMethod(String userId){

        return deliveryMethodMapper.getAll(userId);
    }

}
