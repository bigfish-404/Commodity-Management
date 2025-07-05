import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { addCategory } from '../../../services/productAddService';
import { modalStyle, titleSx, buttonBoxSx } from './ModalStyleItem';
import {
    checkCategoryName,
} from '../../../utils/validators';

export default function AddCategoryModal({ open, onClose, onAdd }) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = async () => {
        const result = checkCategoryName(categoryName);
        if (!result.valid) {
            alert(result.message);
            return;
        }

        await addCategory(categoryName, currentUser);
        setCategoryName('');
        onAdd();   // カテゴリーリスト再取得
        onClose(); // モーダル閉じる
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" sx={titleSx}>新規カテゴリー追加</Typography>
                <TextField
                    fullWidth
                    label="カテゴリー名"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    sx={{ mt: 2 }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSubmit();
                    }}
                />
                <Box sx={buttonBoxSx}>
                    <Button onClick={onClose} variant="outlined">キャンセル</Button>
                    <Button onClick={handleSubmit} variant="contained" sx={{ ml: 1 }}>登録</Button>
                </Box>
            </Box>
        </Modal>
    );
}
