package com.example.backend.service.ChannelService;

import com.example.backend.entity.ChannelEntity;
import com.example.backend.mapper.ChannelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChannelServiceImpl implements ChannelService {

    @Autowired
    private ChannelMapper channelMapper;

    @Override
    public List<ChannelEntity> getAllChannels() {
        return channelMapper.getAllChannels();
    }
}
