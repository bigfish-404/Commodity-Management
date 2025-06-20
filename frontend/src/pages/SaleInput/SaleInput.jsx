import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PlatformSelector from './components/PlatformSelector';
import SalesInputTable from './components/SalesInputTable';

function SaleInput() {
  const [platform, setPlatform] = useState("mercari");
  const [channelMap, setChannelMap] = useState({});  // 👈 用于存储渠道映射
  const [channelId, setChannelId] = useState(null);

  // 每当平台变更，就同步设置对应的 channelId
  useEffect(() => {
    if (platform && channelMap[platform]) {
      setChannelId(channelMap[platform]);
    }
  }, [platform, channelMap]);

  return (
    <>
      <Helmet>
        <title>販売</title>
      </Helmet>
      <div>
        <PlatformSelector
          platform={platform}
          setPlatform={setPlatform}
          setChannelMap={setChannelMap} 
        />
        <SalesInputTable
          platform={platform}
          channelId={channelId} 
        />
      </div>
    </>
  );
}

export default SaleInput;
