package com.example.backend.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.example.backend.entity.db.ChannelEntity;

@Mapper
public interface ChannelMapper {
    List<ChannelEntity> getAllChannels();
}
