import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Box,
    Typography,
    Grid,
    Paper,
    ToggleButtonGroup,
    ToggleButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

export default function Homepage() {
    const navigate = useNavigate();
    const [timeRange, setTimeRange] = useState('month');
    const [chartData, setChartData] = useState([]);
    const [pieData, setPieData] = useState([]);

    const fetchChartData = async (range) => {
        const userId = JSON.parse(localStorage.getItem("currentUser"))?.userId;
        if (!userId) {
            console.error("ユーザー情報が取得できません");
            return;
        }

        try {
            const res = await axios.get(`/api/profit/stats`, {
                params: {
                    userId,
                    range
                }
            });

            const lineBarData = res.data;

            // Pie 图暂时使用 sales 按 label 汇总构造
            const pieDataTemp = lineBarData.map(item => ({
                name: item.label,
                value: item.sales
            }));

            setChartData(lineBarData);
            setPieData(pieDataTemp);

        } catch (err) {
            console.error('データ取得失敗:', err);
        }
    };

    useEffect(() => {
        fetchChartData(timeRange);
    }, [timeRange]);

    const handleRangeChange = (event, newRange) => {
        if (newRange !== null) {
            setTimeRange(newRange);
        }
    };


    return (
        <>
            <Helmet>
                <title>ホームページ</title>
            </Helmet>

            <Box sx={{ p: 4 }}>
                <ToggleButtonGroup
                    value={timeRange}
                    exclusive
                    onChange={handleRangeChange}
                    sx={{ mb: 3 }}
                >
                    <ToggleButton value="month">今月</ToggleButton>
                    <ToggleButton value="quarter">3ヶ月</ToggleButton>
                    <ToggleButton value="half">半年</ToggleButton>
                    <ToggleButton value="year">1年</ToggleButton>
                </ToggleButtonGroup>

                <Grid container spacing={3}>
                    {/* 左侧图表 */}
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 3, height: 450 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="label" />
                                    <YAxis yAxisId="left" stroke="#333" />
                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                        tickFormatter={(value) => `${value}%`}
                                        stroke="#00C49F"
                                        domain={[-20, 40]}
                                    />
                                    <Tooltip />
                                    <Legend verticalAlign="top" height={36} />
                                    <Bar yAxisId="left" dataKey="sales" name="売上" fill="#ffd700" radius={[4, 4, 0, 0]} barSize={20} />
                                    <Bar yAxisId="left" dataKey="profit" name="利益" fill="#8884d8" radius={[4, 4, 0, 0]} barSize={20} />
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="growth"
                                        name="成長率（%）"
                                        stroke="#00C49F"
                                        strokeWidth={3}
                                        dot={{ stroke: '#00C49F', strokeWidth: 2, r: 5, fill: '#00C49F' }}
                                        activeDot={{ r: 6, stroke: '#00C49F', fill: '#fff', strokeWidth: 2 }}
                                    />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

                    {/* 右侧圆环图 */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2, height: 450, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Box sx={{ height: '48%' }}>
                                <Typography variant="h6">プラットフォーム別売上</Typography>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={70}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </Box>

                            <Box sx={{ height: '48%' }}>
                                <Typography variant="h6">在庫構成比</Typography>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={70}
                                            fill="#82ca9d"
                                            dataKey="value"
                                            label
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell2-${index}`} fill={COLORS[(index + 1) % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box >
        </>
    );
}
