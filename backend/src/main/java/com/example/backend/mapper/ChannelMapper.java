package com.example.backend.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.backend.entity.db.ChannelEntity;

@Mapper
public interface ChannelMapper {
    List<ChannelEntity> getAllChannels(@Param("userId") String userId);

    int insertChannel(ChannelEntity channel);
}
