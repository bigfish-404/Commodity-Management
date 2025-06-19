package com.example.backend.controller;

import com.example.backend.entity.ChannelEntity;
import com.example.backend.service.ChannelService.ChannelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ChannelController {

    @Autowired
    private ChannelService channelService;

    @GetMapping("/channels")
    public List<ChannelEntity> getAllChannels() {
        return channelService.getAllChannels();
    }
}
