package com.example.backend.service.ChannelService;

import java.util.List;

import com.example.backend.entity.db.ChannelEntity;

public interface ChannelService {
    List<ChannelEntity> getAllChannels();
}
