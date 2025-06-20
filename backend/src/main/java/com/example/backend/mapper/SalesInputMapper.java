package com.example.backend.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.backend.entity.ProfitEntity;
import com.example.backend.entity.SalesInputEntity;

@Mapper
public interface SalesInputMapper {

    List<SalesInputEntity> selectAvailableSalesProductsByUserId(
            @Param("userId") Long userId,
            @Param("channelId") Long channelId);

    int insertProfit(ProfitEntity profit);

    void updateProductAfterSale(
            @Param("userId") Long userId,
            @Param("quantity") Integer quantity,
            @Param("salesPerson") String salesPerson,
            @Param("productName") String productName,
            @Param("categoryName") String category,
            @Param("specName") String spec
            );
}
