import React, { useState, useEffect } from 'react';
import './SalesInputTable.css';
import { TextField, Button, Typography, Box } from '@mui/material';
import { fetchSalesData } from '../../../services/salesService';

export default function SalesInputTable({ platform }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        loadSalesData();
    }, []);

    const loadSalesData = async () => {
        const data = await fetchSalesData();
        setRows(data);
    };

    const handleChange = (index, field, value) => {
        const updated = [...rows];
        updated[index][field] = value;
        setRows(updated);
    };

    return (
        <table className="sales-input-table">
            <thead>
                <tr>
                    <th>商品名</th>
                    <th>カテゴリー</th>
                    <th>規格</th>
                    <th>数量</th>
                    <th>販売価格</th>
                    <th>手数料</th>
                    <th>配送料</th>
                    <th>利益</th>
                    <th>操作</th>

                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr key={row.id}>
                        <td><div className="display-cell">{row.productName}</div></td>
                        <td><div className="display-cell">{row.categoryName}</div></td>
                        <td><div className="display-cell">{row.specName}</div></td>

                        <td>
                            <TextField className="small-input" type="number"
                                value={row.quantity}
                                onChange={(e) => handleChange(index, 'quantity', e.target.value)} />
                        </td>

                        <td>
                            <TextField className="small-input"
                                value={row.salesPrice}
                                onChange={(e) => handleChange(index, 'salesPrice', e.target.value)} />
                        </td>

                        <td>
                            <TextField className="small-input"
                                value={row.handlingFee}
                                onChange={(e) => handleChange(index, 'handlingFee', e.target.value)} />
                        </td>

                        <td>
                            <TextField className="small-input"
                                value={row.deliveryFee}
                                onChange={(e) => handleChange(index, 'deliveryFee', e.target.value)} />
                        </td>

                        <td>
                            <TextField className="small-input"
                                value={row.profit}
                                onChange={(e) => handleChange(index, 'profit', e.target.value)} />
                        </td>

                        <td>
                            <div className="action-buttons">
                                <Button variant="contained" size="small" color="primary">确认</Button>
                                <Button variant="outlined" size="small" color="secondary">取消</Button>
                            </div>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    );
}
