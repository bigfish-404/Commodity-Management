import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import axios from 'axios';
import './PlatformSelector.css';

export default function PlatformSelector({ platform, setPlatform, setChannelMap }) {
  const [displayMap, setDisplayMap] = useState({}); // { mercari: "メルカリ", yahoo: "ヤフオク" }
  const [internalChannelMap, setInternalChannelMap] = useState({}); // { mercari: 1, yahoo: 2 }

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get('/api/channels');
        const display = {};
        const map = {};
        response.data.forEach((channel) => {
          display[channel.channelName] = channel.displayName;
          map[channel.channelName] = channel.id;
        });
        setDisplayMap(display);
        setInternalChannelMap(map);
        setChannelMap(map);

        if (!platform && Object.keys(display).length > 0) {
          setPlatform(Object.keys(display)[0]);
        }
      } catch (error) {
        console.error("❌error", error);
      }
    };

    fetchChannels();
  }, []);

  return (
    <Box className="platform-selector-box">
      <Tabs value={platform} onChange={(e, v) => setPlatform(v)} centered>
        {Object.keys(displayMap).map((key) => (
          <Tab key={key} label={displayMap[key]} value={key} />
        ))}
      </Tabs>
    </Box>
  );
}
