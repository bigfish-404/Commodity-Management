import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Box, Typography, Grid, Paper, ToggleButtonGroup, ToggleButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import ChannelDonutChart from './components/ChannelDonutChart';

export default function Homepage() {
    const navigate = useNavigate();
    const [timeRange, setTimeRange] = useState('month');
    const [chartData, setChartData] = useState([]);

    const fetchChartData = async (range) => {
        const userId = JSON.parse(localStorage.getItem("currentUser"))?.userId;
        if (!userId) return;

        try {
            const res = await axios.get(`/api/profit/stats`, { params: { userId, range } });
            setChartData(res.data);
        } catch (err) {
            console.error('メインチャート取得失敗:', err);
        }
    };

    useEffect(() => {
        fetchChartData(timeRange);
    }, [timeRange]);

    const handleRangeChange = (event, newRange) => {
        if (newRange !== null) setTimeRange(newRange);
    };

    return (
        <>
            <Helmet>
                <title>ホームページ</title>
            </Helmet>

            <Box sx={{ p: 4 }}>


                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 3, height: 450, display: 'flex', flexDirection: 'column' }}>
                            {/* 按钮组高度约 40px */}
                            <ToggleButtonGroup
                                value={timeRange}
                                exclusive
                                onChange={handleRangeChange}
                                size="small"
                                sx={{ mb: 1 }}
                            >
                                <ToggleButton value="week">週別</ToggleButton>
                                <ToggleButton value="month">月別</ToggleButton>
                                <ToggleButton value="quarter">四半期</ToggleButton>
                                <ToggleButton value="half">半年</ToggleButton>
                                <ToggleButton value="year">年別</ToggleButton>
                            </ToggleButtonGroup>

                            {/* 图表容器高度占剩余空间 */}
                            <Box sx={{ flex: 1 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="label" />
                                        <YAxis yAxisId="left" />
                                        <YAxis
                                            yAxisId="right"
                                            orientation="right"
                                            tickFormatter={(v) => `${v}%`}
                                            domain={[-100, 300]} // 限制增长率，避免爆炸
                                        />
                                        <Tooltip />
                                        <Legend />
                                        <Bar yAxisId="left" dataKey="sales" name="売上" fill="#ffd700" />
                                        <Bar yAxisId="left" dataKey="profit" name="利益" fill="#8884d8" />
                                        <Line yAxisId="right" type="monotone" dataKey="growth" name="成長率（%）" stroke="#00C49F" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </Box>
                        </Paper>

                    </Grid>

                    <Grid item xs={12} md={4}>
                        <ChannelDonutChart range={timeRange} />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
