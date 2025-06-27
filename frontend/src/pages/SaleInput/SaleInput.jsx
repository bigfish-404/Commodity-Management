import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PlatformSelector from './components/PlatformSelector';
import SalesInputTable from './components/SalesInputTable';

function SaleInput() {
  const [platform, setPlatform] = useState("");
  const [channelMap, setChannelMap] = useState({});  
  const [channelId, setChannelId] = useState(null);
  const [handlingFeeMap, setHandlingFeeMap] = useState({});

  // 每当平台变更，就同步设置对应的 channelId
  useEffect(() => {
    if (platform && channelMap[platform]) {
      setChannelId(channelMap[platform]);
    }
  }, [platform, channelMap]);

  return (
    <>
      <Helmet>
        <title>販売登録</title>
      </Helmet>
      <div>
        <PlatformSelector
          platform={platform}
          setPlatform={setPlatform}
          setChannelMap={setChannelMap} 
          setHandlingFeeMap={setHandlingFeeMap}
        />
        <SalesInputTable
          platform={platform}
          channelId={channelId} 
          handlingFeeMap={handlingFeeMap}
        />
      </div>
    </>
  );
}

export default SaleInput;
