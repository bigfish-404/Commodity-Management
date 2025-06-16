import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { addCategory } from '../../../services/productAddService';

export default function AddCategoryModal({ open, onClose, onAdd }) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = async () => {
        if (!categoryName.trim()) {
            alert("カテゴリー名を入力してください");
            return;
        }
        await addCategory(categoryName, currentUser);
        setCategoryName('');
        onAdd(); // 重新加载分类
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ p: 3, bgcolor: 'white', mx: 'auto', my: '20%', width: 400 }}>
                <Typography variant="h6">新規カテゴリー追加</Typography>
                <TextField
                    fullWidth
                    label="カテゴリー名"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
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
