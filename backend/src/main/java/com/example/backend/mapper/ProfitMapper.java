package com.example.backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.example.backend.entity.dto.SalesSummaryDTO;

import java.util.Date;
import java.util.List;

@Mapper
public interface ProfitMapper {
     List<SalesSummaryDTO> getSalesSummaryByDateRange(
        @Param("userId") String userId,
        @Param("startDate") Date startDate,
        @Param("endDate") Date endDate
    );

}
