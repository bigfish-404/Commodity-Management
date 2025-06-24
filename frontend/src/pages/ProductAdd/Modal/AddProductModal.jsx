// AddProductModal.jsx
import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { addProductInfo } from '../../../services/productAddService'; // 你要实现这个函数

export default function AddProductModal({ open, onClose, onAdd }) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [productName, setProductName] = useState('');

    const handleSubmit = async () => {
        if (!productName.trim()) {
            alert("品番名を入力してください");
            return;
        }
        await addProductInfo(productName, currentUser);
        setProductName('');
        onAdd(); // 重新加载品番列表
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ p: 3, bgcolor: 'white', mx: 'auto', my: '20%', width: 400 }}>
                <Typography variant="h6">新規品番追加</Typography>
                <TextField
                    fullWidth
                    label="品番名"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <Box sx={{ mt: 2, textAlign: 'right' }}>
                    <Button onClick={onClose} sx={{ mr: 1 }}>キャンセル</Button>
                    <Button variant="contained" onClick={handleSubmit}>登録</Button>
                </Box>
            </Box>
        </Modal>
    );
}
