package com.example.backend.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.backend.entity.db.ProfitEntity;
import com.example.backend.entity.dto.SalesInputEntity;

@Mapper
public interface SalesInputMapper {

    List<SalesInputEntity> selectAvailableSalesProductsByUserId(
            @Param("userId") String userId,
            @Param("channelId") Long channelId);

    int insertProfit(ProfitEntity profit);

    int updateProductAfterSale(
            @Param("userId") String userId,
            @Param("quantity") Integer quantity,
            @Param("salesPerson") String salesPerson,
            @Param("productId") String productId,
            @Param("categoryId") String categoryId,
            @Param("specId") String specId
            );
}
