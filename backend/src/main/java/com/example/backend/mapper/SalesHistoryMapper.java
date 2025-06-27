package com.example.backend.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.backend.entity.db.ProductEntity;
import com.example.backend.entity.dto.SalesHistoryEntity;

@Mapper
public interface SalesHistoryMapper {
    List<SalesHistoryEntity> selectAllProfits(@Param("userId") String userId);
    int updateProfitIfChanged(SalesHistoryEntity salesHistoryEntity);
    void markAsDeleted(@Param("id") Long id);
    void updateProductOnDelete(ProductEntity product);
}
