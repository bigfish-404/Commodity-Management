import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
} from '@mui/material';

import { updateProfit } from '../../../services/salesHistoryService';
import { inputSx, readOnlyInputSx } from './editModalStyles';

export default function EditModal({ open, item, onClose, onSave }) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (item) {
            setFormData({ ...item });
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updateProfit(formData);
            alert(res);
            onSave(formData);
            onClose();
        } catch (err) {
            alert('更新失敗');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>販売履歴編集</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>
                        {/* ReadOnly 部分 */}
                        <Grid item xs={4}>
                            <TextField
                                label="商品名"
                                name="productName"
                                value={formData.productName || ''}
                                onChange={handleChange}
                                InputProps={{ readOnly: true }}
                                variant="filled"
                                sx={readOnlyInputSx}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="カテゴリ"
                                name="category"
                                value={formData.categoryName || ''}
                                onChange={handleChange}
                                InputProps={{ readOnly: true }}
                                variant="filled"
                                sx={readOnlyInputSx}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="規格・仕様"
                                name="spec"
                                value={formData.specName || ''}
                                onChange={handleChange}
                                InputProps={{ readOnly: true }}
                                variant="filled"
                                sx={readOnlyInputSx}
                            />
                        </Grid>

                        {/* 可编辑部分 */}
                        <Grid item xs={4}>
                            <TextField
                                label="売り数量"
                                name="quantity"
                                type='number'
                                value={formData.quantity || ''}
                                onChange={handleChange}
                                sx={inputSx}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="単価"
                                name="salesPrice"
                                type='number'

                                value={formData.salesPrice || ''}
                                onChange={handleChange}
                                sx={inputSx}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="利益"
                                name="profit"
                                type='number'
                                value={formData.profit || ''}
                                onChange={handleChange}
                                sx={inputSx}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}  variant="outlined">キャンセル</Button>
                    <Button type="submit" variant="contained">
                        保存
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
