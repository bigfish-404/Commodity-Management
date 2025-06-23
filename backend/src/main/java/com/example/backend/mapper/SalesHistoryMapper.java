package com.example.backend.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.backend.entity.ProfitEntity;
import com.example.backend.entity.SalesHistoryEntity;

@Mapper
public interface SalesHistoryMapper {
    List<SalesHistoryEntity> selectAllProfits(@Param("userId") Long userId);
    int updateProfitIfChanged(ProfitEntity profit);

}
