// src/pages/Homepage/Homepage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Grid } from '@mui/material';

import MonthlyOverview from './Components/MonthlyOverview/MonthlyOverview';
import SalesSummaryFlexible from './Components/SalesSummaryFlexible/SalesSummaryFlexible';
import ChannelDonutChart from './Components/ChannelDonutChart/ChannelDonutChart';


function Homepage() {
    const [timeRange, setTimeRange] = useState('month');

    const handleRangeChange = (event, newRange) => {
        if (newRange !== null) setTimeRange(newRange);
    };

    return (
        <>
            <Helmet>
                <title>ホームページ</title>
            </Helmet>

            <Box sx={{ p: 4 }}>
                {/* 今月の売上・利益概要 */}
                <MonthlyOverview />

                {/* 主图表 + 饼图区域 */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ height: 400 }}>
                            <SalesSummaryFlexible
                                timeRange={timeRange}
                                onRangeChange={handleRangeChange}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box sx={{ height: 400 }}>
                            <ChannelDonutChart range={timeRange} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
export default Homepage;