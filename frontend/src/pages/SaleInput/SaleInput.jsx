// src/pages/SaleInput/index.jsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Box, Typography } from '@mui/material';
import PlatformSelector from './components/PlatformSelector';
import SalesInputTable from './components/SalesInputTable';
import { containerSx } from './SaleInputStyles';

function SaleInput() {
    const [platform, setPlatform] = useState("");
    const [channelMap, setChannelMap] = useState({});
    const [channelId, setChannelId] = useState(null);
    const [handlingFeeMap, setHandlingFeeMap] = useState({});

    // 毎回 platform が変更されたときに channelId を更新
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
            {/* 页面主容器 */}
            <Container maxWidth="lg" sx={containerSx}>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ pb: 2 }}>
                        販売登録
                    </Typography>
                    <PlatformSelector
                        platform={platform}
                        setPlatform={setPlatform}
                        setChannelMap={setChannelMap}
                        setHandlingFeeMap={setHandlingFeeMap}
                    />
                </Box>

                <SalesInputTable
                    platform={platform}
                    channelId={channelId}
                    handlingFeeMap={handlingFeeMap}
                />
            </Container>
        </>
    );
}

export default SaleInput;