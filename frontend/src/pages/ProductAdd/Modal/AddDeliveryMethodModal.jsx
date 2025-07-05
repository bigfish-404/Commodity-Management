import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { addDeliveryMethod } from '../../../services/productAddService';
import { modalStyle, titleSx, buttonBoxSx } from './ModalStyleItem';
import {
    checkDeliveryCompany,
    checkDeliveryMethod
} from '../../../utils/validators';

export default function AddDeliveryMethodModal({ open, onClose, onAdd }) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [companyName, setCompanyName] = useState('');
    const [methodName, setMethodName] = useState('');

    const handleSubmit = async () => {
        const validations = [
            checkDeliveryCompany(companyName),
            checkDeliveryMethod(methodName),
        ];
        const errors = validations.filter(v => !v.valid);
        if (errors.length > 0) {
            const errorMessages = errors.map(e => `・${e.message}`).join('\n');
            alert(`以下の項目に誤りがあります：\n\n${errorMessages}`);
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

        try {
            await addDeliveryMethod(payload);
            setCompanyName('');
            setMethodName('');
            onAdd();
            onClose();
        } catch (error) {
            console.error(error);
            alert("登録に失敗しました");
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" sx={titleSx}>配送会社 + 方法 追加</Typography>

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
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSubmit();
                    }}
                />

                <Box sx={buttonBoxSx}>
                    <Button onClick={onClose} variant="outlined">キャンセル</Button>
                    <Button variant="contained" onClick={handleSubmit} sx={{ ml: 1 }}>登録</Button>
                </Box>
            </Box>
        </Modal>
    );
}
