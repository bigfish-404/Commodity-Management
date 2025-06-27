package com.example.backend.controller;

import com.example.backend.entity.db.ChannelEntity;
import com.example.backend.service.ChannelService.ChannelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/channel")
public class ChannelController {

    @Autowired
    private ChannelService channelService;

    @GetMapping("/getAll")
    public List<ChannelEntity> getAllChannels(@RequestParam("userId") String userId) {
        return channelService.getAllChannels(userId);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addChannel(@RequestBody ChannelEntity channel) {
        try {
            channelService.addChannel(channel);
            return ResponseEntity.ok().body("チャネル登録成功");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("チャネル登録失敗：" + e.getMessage());
        }
    }
}
