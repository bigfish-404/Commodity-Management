package com.example.backend.mapper;

import java.util.List;
import com.example.backend.entity.db.DeliveryMethodEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DeliveryMethodMapper {
    
    List<DeliveryMethodEntity> getAll(String userId);

    int insertDeliveryMethod(DeliveryMethodEntity entity);
}