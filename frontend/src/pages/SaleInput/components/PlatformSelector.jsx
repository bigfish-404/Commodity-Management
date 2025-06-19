import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import axios from 'axios';
import './PlatformSelector.css';

export default function PlatformSelector({ platform, setPlatform }) {
  const [displayMap, setDisplayMap] = useState({}); // 存储后端返回的数据

  const handleChange = (event, newValue) => {
    setPlatform(newValue);
  };

useEffect(() => {
  const fetchChannels = async () => {
    try {
      const response = await axios.get('/api/channels');
      const map = {};
      response.data.forEach((channel) => {
        map[channel.channelName] = channel.displayName; 
      });
      setDisplayMap(map);

      // 可选：初始化默认选中第一个
      if (!platform && Object.keys(map).length > 0) {
        setPlatform(Object.keys(map)[0]);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  fetchChannels();
}, []);


  return (
    <Box className="platform-selector-box">
      <Tabs value={platform} onChange={handleChange} centered>
        {Object.keys(displayMap).map((key) => (
          <Tab
            key={key}
            label={displayMap[key]}
            value={key}
            className={`platform-tab ${platform === key ? 'selected' : ''}`}
          />
        ))}
      </Tabs>
    </Box>
  );
}
