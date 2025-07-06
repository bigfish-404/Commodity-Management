// src/components/PlatformSelector/PlatformSelector.jsx
import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { fetchChannelsByUserId } from '../../../services/channelService';
import { tabsBoxSx, tabSx } from './platformSelectorStyles';

export default function PlatformSelector({ platform, setPlatform, setChannelMap, setHandlingFeeMap }) {
    const [channelNames, setChannelNames] = useState([]);
    const [internalChannelMap, setInternalChannelMap] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUser = JSON.parse(localStorage.getItem("currentUser"));
                const userId = currentUser?.userId;

                if (!userId) {
                    console.warn("❗ ユーザー情報が取得できません");
                    return;
                }

                const data = await fetchChannelsByUserId(userId);
                const map = {};
                const names = [];
                const feeMap = {};

                data.forEach((channel) => {
                    map[channel.channelName] = channel.channelId;
                    feeMap[channel.channelName] = channel.handlingFee;
                    names.push(channel.channelName);
                });

                setInternalChannelMap(map);
                setChannelMap(map);
                setChannelNames(names);
                setHandlingFeeMap(feeMap);

                if (!platform && names.length > 0) {
                    setPlatform(names[0]);
                }
            } catch (err) {
                console.error("❌ fetchChannelsByUserId error:", err);
            }
        };

        fetchData();
    }, []);

    if (!platform) return null;

    return (
        <Box sx={tabsBoxSx}>
            <Tabs
                value={platform}
                onChange={(e, v) => setPlatform(v)}
                centered
                textColor="primary"
                indicatorColor="primary"
                variant="scrollable"
                scrollButtons="auto"
            >
                {channelNames.map((name) => (
                    <Tab
                        key={name}
                        label={name}
                        value={name}
                        sx={tabSx(platform === name)}
                    />
                ))}
            </Tabs>
        </Box>
    );
}
