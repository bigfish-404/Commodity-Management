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

// 固定颜色列表
const FIXED_COLOR_LIST = [
    '#FFD700', // 金黄色
    '#00BFFF', // 深天蓝
    '#FF6F61', // 橙红色
    '#9C27B0', // 紫色
    '#00C49F', // 青绿色
    '#FF9800'  // 橙色
];

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
            const res = await axios.get(`/api/profit/channel-ratio`, {
                params: { userId, range: selectedRange },
            });

            const rawData = res.data;

            // ✅ 按 channelId 升序排序
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

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { name, sales, profit, ratio } = payload[0].payload;
            return (
                <div style={{ backgroundColor: '#fff', padding: 10, border: '1px solid #ccc' }}>
                    <p style={{ margin: 0 }}>{name}</p>
                    <p style={{ margin: 0 }}>売上: ¥{sales.toLocaleString()}（{ratio}%）</p>
                    <p style={{ margin: 0 }}>利益: ¥{profit.toLocaleString()}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Paper sx={{ p: 3, height: 450 }}>
            <ToggleButtonGroup
                value={range}
                exclusive
                onChange={handleRangeChange}
                size="small"
                sx={{ mb: 1 }}
            >
                <ToggleButton value="day">日</ToggleButton>
                <ToggleButton value="week">週</ToggleButton>
                <ToggleButton value="month">月</ToggleButton>
                <ToggleButton value="quarter">四半期</ToggleButton>
                <ToggleButton value="half">半年</ToggleButton>
                <ToggleButton value="year">年</ToggleButton>
            </ToggleButtonGroup>

            {donutData.length > 0 ? (
                <ResponsiveContainer width="100%" height="75%">
                    <PieChart>
                        <Tooltip content={<CustomTooltip />} />

                        {/* 外側：売上 (显示线和金额) */}
                        <Pie
                            data={donutData}
                            dataKey="sales"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            innerRadius={60}
                            isAnimationActive={false}
                            labelLine={false}
                            label={false}
                        >
                            {donutData.map((entry, index) => (
                                <Cell key={`cell-sales-${index}`} fill={entry.color} />
                            ))}
                        </Pie>

                        {/* 内側：利益 (不显示 label/线) */}
                        <Pie
                            data={donutData}
                            dataKey="profit"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={55}
                            innerRadius={35}
                            isAnimationActive={false}
                            labelLine={false}
                            label={false}
                        >
                            {donutData.map((entry, index) => (
                                <Cell key={`cell-profit-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

            ) : (
                <Box sx={{ height: '75%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="text.secondary">データがありません</Typography>
                </Box>
            )}

            <Box sx={{ mt: 2 }}>
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
