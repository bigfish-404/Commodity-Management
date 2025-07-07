import React, { useEffect, useState } from 'react';
import {
    ComposedChart, Bar, Line, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Box, Paper, ToggleButtonGroup, ToggleButton } from '@mui/material';
import {
    paperSx,
    toggleButtonGroupSx,
    chartContainerSx
} from './salesSummaryFlexibleStyles';
import { fetchsalesSummaryFlexibleStyles } from '../../../../services/homepage';


function SalesSummaryFlexible({ timeRange, onRangeChange }) {
    const [chartData, setChartData] = useState([]);

    const fetchChartData = async (range) => {
    const userId = JSON.parse(localStorage.getItem("currentUser"))?.userId;
    const data = await fetchsalesSummaryFlexibleStyles(userId, range);
    setChartData(data);
};

    useEffect(() => {
        fetchChartData(timeRange);
    }, [timeRange]);

    return (
        <Paper sx={paperSx}>
            <ToggleButtonGroup
                value={timeRange}
                exclusive
                onChange={onRangeChange}
                size="small"
                sx={toggleButtonGroupSx}
            >
                <ToggleButton value="week">週別</ToggleButton>
                <ToggleButton value="month">月別</ToggleButton>
                <ToggleButton value="quarter">四半期</ToggleButton>
                <ToggleButton value="half">半年</ToggleButton>
                <ToggleButton value="year">年別</ToggleButton>
            </ToggleButtonGroup>

            <Box sx={chartContainerSx}>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData}>
                        <XAxis dataKey="label" />
                        <YAxis yAxisId="left" />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            tickFormatter={(v) => `${v}%`}
                            domain={[-100, 300]}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="sales" name="売上" fill="#ffd700" />
                        <Bar yAxisId="left" dataKey="profit" name="利益" fill="#8884d8" />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="growth"
                            name="成長率（%）"
                            stroke="#00C49F"
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
}

export default SalesSummaryFlexible;
