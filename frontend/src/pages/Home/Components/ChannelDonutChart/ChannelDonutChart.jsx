// src/pages/Home/Components/ChannelDonutChart.jsx

import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';
import axios from 'axios';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip
} from 'recharts';

import {
    paperSx,
    toggleGroupSx,
    chartTitleBoxSx,
    chartWrapperSx,
    legendBoxSx,
    tooltipStyle,
    pieLabelStyle
} from './channelDonutChartStyles';

// 固定颜色列表
const FIXED_COLOR_LIST = [
    '#FFD700', // 金黄色
    '#00BFFF', // 深天蓝
    '#FF6F61', // 橙红色
    '#9C27B0', // 紫色
    '#00C49F', // 青绿色
    '#FF9800'  // 橙色
];

// 自定义 label 显示百分比
const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const value = `${(percent * 100).toFixed(1)}%`;

    return (
        <text
            x={x}
            y={y}
            {...pieLabelStyle}
        >
            {value}
        </text>
    );
};

// Tooltip 内容
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { name, sales, profit } = payload[0].payload;
        return (
            <div style={tooltipStyle}>
                <p style={{ margin: 0 }}>{name}</p>
                <p style={{ margin: 0 }}>売上: ¥{sales.toLocaleString()}</p>
                <p style={{ margin: 0 }}>利益: ¥{profit.toLocaleString()}</p>
            </div>
        );
    }
    return null;
};

export default function ChannelDonutChart() {
    const [range, setRange] = useState('month');
    const [donutData, setDonutData] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("currentUser"));
        if (storedUser?.userId) {
            setUserId(storedUser.userId);
        } else {
            console.warn("ユーザーIDが見つかりません");
        }
    }, []);

    const fetchDonutData = async (selectedRange) => {
        if (!userId) return;

        try {
            const res = await axios.get(`/api/homepage/channel-ratio`, {
                params: { userId, range: selectedRange },
            });
console.log("📊 donut data raw response:", res.data);
            const rawData = res.data;
            rawData.sort((a, b) => a.channelId - b.channelId);

            const totalSales = rawData.reduce((sum, item) => sum + item.sales, 0);

            const pieData = rawData.map((item, index) => ({
                ...item,
                ratio: totalSales === 0 ? 0 : ((item.sales / totalSales) * 100).toFixed(1),
                color: FIXED_COLOR_LIST[index % FIXED_COLOR_LIST.length]
            }));

            setDonutData(pieData);
        } catch (err) {
            console.error('円グラフデータ取得失敗:', err);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchDonutData(range);
        }
    }, [range, userId]);

    const handleRangeChange = (event, newRange) => {
        if (newRange !== null) setRange(newRange);
    };

    return (
        <Paper sx={paperSx}>
            {/* 时间范围按钮组 */}
            <ToggleButtonGroup
                value={range}
                exclusive
                onChange={handleRangeChange}
                size="small"
                sx={toggleGroupSx}
            >
                <ToggleButton value="day">日</ToggleButton>
                <ToggleButton value="week">週</ToggleButton>
                <ToggleButton value="month">月</ToggleButton>
                <ToggleButton value="quarter">四半期</ToggleButton>
                <ToggleButton value="half">半年</ToggleButton>
                <ToggleButton value="year">年</ToggleButton>
            </ToggleButtonGroup>

            {/* 图表标题 */}
            <Box sx={chartTitleBoxSx}>
                <Typography variant="subtitle1" fontWeight="bold">売上</Typography>
                <Typography variant="subtitle1" fontWeight="bold">利益</Typography>
            </Box>

            {/* 图表主体 */}
            <Box sx={chartWrapperSx}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Tooltip content={<CustomTooltip />} />

                        {/* 左边：売上 */}
                        <Pie
                            data={donutData}
                            dataKey="sales"
                            nameKey="name"
                            cx="30%"
                            cy="50%"
                            outerRadius={70}
                            innerRadius={40}
                            labelLine={false}
                            label={renderPieLabel}
                            isAnimationActive={false}
                        >
                            {donutData.map((entry, index) => (
                                <Cell key={`sales-${index}`} fill={entry.color} />
                            ))}
                        </Pie>

                        {/* 右边：利益 */}
                        <Pie
                            data={donutData}
                            dataKey="profit"
                            nameKey="name"
                            cx="70%"
                            cy="50%"
                            outerRadius={70}
                            innerRadius={40}
                            labelLine={false}
                            label={renderPieLabel}
                            isAnimationActive={false}
                        >
                            {donutData.map((entry, index) => (
                                <Cell key={`profit-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </Box>

            {/* 图例 */}
            <Box sx={legendBoxSx}>
                {donutData.map((item, idx) => (
                    <Typography key={idx} variant="body2">
                        <span style={{ color: item.color, fontWeight: 600 }}>⬤</span>&nbsp;
                        {item.channelName}
                    </Typography>
                ))}
            </Box>
        </Paper>
    );
}
