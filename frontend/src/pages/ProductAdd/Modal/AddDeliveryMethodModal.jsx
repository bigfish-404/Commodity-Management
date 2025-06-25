// src/components/Modal/AddDeliveryMethodModal.jsx
import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { addDeliveryMethod } from '../../../services/productAddService';

export default function AddDeliveryMethodModal({ open, onClose, onAdd }) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [companyName, setCompanyName] = useState('');
    const [methodName, setMethodName] = useState('');

    const handleSubmit = async () => {
        if (!companyName.trim() || !methodName.trim()) {
            alert("配送会社と配送方法の両方を入力してください");
            return;
        }

        const payload = {
            userId: currentUser.userId,
            deliveryCompany: companyName,
            deliveryMethod: methodName,
            createdBy: currentUser.name,
            updatedBy: currentUser.name,
            deletedFlg: '0'
        };

        await addDeliveryMethod(payload);
        setCompanyName('');
        setMethodName('');
        onAdd();      
        onClose();   
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ p: 3, bgcolor: 'white', mx: 'auto', my: '20%', width: 400 }}>
                <Typography variant="h6">配送会社 + 方法 追加</Typography>
                <TextField
                    fullWidth
                    label="配送会社名"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <TextField
                    fullWidth
                    label="配送方法名"
                    value={methodName}
                    onChange={(e) => setMethodName(e.target.value)}
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
