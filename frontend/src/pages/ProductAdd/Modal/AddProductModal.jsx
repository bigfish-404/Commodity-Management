import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { addProductInfo } from '../../../services/productAddService';
import { modalStyle, titleSx, buttonBoxSx } from './ModalStyleItem';
import {
    checkProductName
} from '../../../utils/validators';

export default function AddProductModal({ open, onClose, onAdd }) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [productName, setProductName] = useState('');

    const handleSubmit = async () => {
        const result = checkProductName(productName);
        if (!result.valid) {
            alert(result.message);
            return;
        }
        
        await addProductInfo(productName, currentUser);
        setProductName('');
        onAdd();   // 品番一覧を再取得
        onClose(); // モーダルを閉じる
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" sx={titleSx}>新規品番追加</Typography>
                <TextField
                    fullWidth
                    label="品番名"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
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
