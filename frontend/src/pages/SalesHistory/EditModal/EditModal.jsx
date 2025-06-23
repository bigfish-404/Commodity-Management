import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Grid
} from '@mui/material';

import { updateProfit } from '../../../services/salesHistoryService';

export default function EditModal({ open, item, onClose, onSave }) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (item) {
            setFormData({ ...item });
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await updateProfit(formData);
            alert(res); 
            onSave(formData); 
            onClose();
        } catch (err) {
            alert("更新失败");
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>販売履歴編集</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                label="商品名"
                                name="productName"
                                fullWidth
                                size="small"
                                value={formData.productName || ''}
                                onChange={handleChange}
                                InputProps={{ readOnly: true }}
                                variant="filled"
                                className="readonly-input"
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                label="カテゴリ"
                                name="category"
                                fullWidth
                                size="small"
                                value={formData.category || ''}
                                onChange={handleChange}
                                InputProps={{ readOnly: true }}
                                variant="filled"
                                className="readonly-input"
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                label="規格・仕様"
                                name="spec"
                                fullWidth
                                size="small"
                                value={formData.spec || ''}
                                onChange={handleChange}
                                InputProps={{ readOnly: true }}
                                variant="filled"
                                className="readonly-input"
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                label="売り数量"
                                name="quantity"
                                fullWidth size="small"
                                value={formData.quantity || ''}
                                onChange={handleChange} />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                label="単価"
                                name="salesPrice"
                                fullWidth size="small"
                                value={formData.salesPrice || ''}
                                onChange={handleChange} />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                label="利益"
                                name="profit"
                                fullWidth size="small"
                                value={formData.profit || ''}
                                onChange={handleChange} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>キャンセル</Button>
                    <Button type="submit" variant="contained">保存</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
