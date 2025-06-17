import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import './PlatformSelector.css';

export default function PlatformSelector({ platform, setPlatform }) {
  const handleChange = (event, newValue) => {
    setPlatform(newValue);
  };

  return (
    <Box className="platform-selector-box">
      <Tabs
        value={platform}
        onChange={handleChange}
        variant="standard"
        // TabIndicatorProps={{ style: { display: 'none' } }}
        centered
      >
        <Tab
          label="メルカリ"
          value="mercari"
          className={`platform-tab ${platform === 'mercari' ? 'selected' : ''}`}
        />
        <Tab
          label="フリマ"
          value="furima"
          className={`platform-tab ${platform === 'furima' ? 'selected' : ''}`}
        />
      </Tabs>
    </Box>
  );
}
