// src/pages/Homepage/components/MonthlyOverview.jsx
import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Grid, Slide } from '@mui/material';
import axios from 'axios';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import {
    boardPaperSx,
    nailSx,
    titleColor,
    iconColor,
    valueColor
} from './MonthlyOverviewStyles';
import { fetchMonthlyOverview } from '../../../../services/homepage';

function useAnimatedNumber(targetValue, duration = 1500) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let startTime = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percent = Math.min(progress / duration, 1);
            const current = Math.floor(percent * targetValue);
            setValue(current);

            if (percent < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, [targetValue, duration]);

    return value;
}

export default function MonthlyOverview() {
    const [overview, setOverview] = useState({ salesTotal: 0, profitTotal: 0 });
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadOverview = async () => {
            const userId = JSON.parse(localStorage.getItem("currentUser"))?.userId;
            if (!userId) return;

            const data = await fetchMonthlyOverview(userId);
            setOverview(data);
            setLoaded(true);
        };

        loadOverview();
    }, []);

    const salesDisplay = useAnimatedNumber(overview.salesTotal || 0, 1200);
    const profitDisplay = useAnimatedNumber(overview.profitTotal || 0, 1200);
    const currentMonth = new Date().getMonth() + 1;

    return (
        <Slide direction="down" in={loaded} timeout={600}>
            <Box sx={{ mb: 3, position: 'relative' }}>
                <Box sx={nailSx('left')} />
                <Box sx={nailSx('right')} />

                <Paper elevation={6} sx={boardPaperSx}>
                    <Grid container alignItems="center">
                        {/* 今月の概要 */}
                        <Grid item xs={4}>
                            <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                                <AccessTimeIcon sx={iconColor} fontSize="large" />
                                <Typography variant="h6" fontWeight="bold" sx={titleColor}>
                                    今月の概要（{currentMonth}月）
                                </Typography>
                            </Box>
                        </Grid>

                        {/* 売上合計 */}
                        <Grid item xs={4}>
                            <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                                <TrendingUpIcon sx={iconColor} />
                                <Box>
                                    <Typography sx={titleColor}>売上合計：</Typography>
                                    <Typography variant="h6" fontWeight="bold" sx={{ color: valueColor.sales }}>
                                        ¥{salesDisplay.toLocaleString()}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        {/* 利益合計 */}
                        <Grid item xs={4}>
                            <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                                <MonetizationOnIcon sx={iconColor} />
                                <Box>
                                    <Typography sx={titleColor}>利益合計：</Typography>
                                    <Typography variant="h6" fontWeight="bold" sx={{ color: valueColor.profit }}>
                                        ¥{profitDisplay.toLocaleString()}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>

            </Box>
        </Slide >
    );
}
