package com.example.backend.service.ChannelService;

import com.example.backend.entity.db.ChannelEntity;
import com.example.backend.mapper.ChannelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ChannelServiceImpl implements ChannelService {

    @Autowired
    private ChannelMapper channelMapper;

    @Override
    public List<ChannelEntity> getAllChannels(String userId) {
        return channelMapper.getAllChannels(userId);
    }

     @Override
    @Transactional(rollbackFor = Exception.class)
    public void addChannel(ChannelEntity channel) {
        int result = channelMapper.insertChannel(channel);
        if (result <= 0) {
            throw new RuntimeException("チャネルの登録に失敗しました");
        }
    }
}
