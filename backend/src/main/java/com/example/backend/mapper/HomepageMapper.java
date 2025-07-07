package com.example.backend.mapper;

import com.example.backend.entity.dto.ChannelRatioSummaryDTO;
import com.example.backend.entity.dto.SalesSummaryDTO;
import com.example.backend.entity.dto.SalesMonthSummaryDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

@Mapper
public interface HomepageMapper {

        SalesMonthSummaryDTO getMonthlyTotal(
                        @Param("userId") String userId,
                        @Param("start") Date start,
                        @Param("end") Date end);

        List<SalesSummaryDTO> getSalesSummaryFlexible(
                        @Param("userId") String userId,
                        @Param("startDate") Date startDate,
                        @Param("endDate") Date endDate,
                        @Param("groupFormat") String groupFormat);

        List<ChannelRatioSummaryDTO> getChannelRatioSummary(
                        @Param("userId") String userId,
                        @Param("startDate") Date startDate,
                        @Param("endDate") Date endDate);

}