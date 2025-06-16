import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { addSpec } from '../../../services/productAddService';

export default function AddSpecModal({ open, onClose, onAdd }) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [specName, setSpecName] = useState('');

    const handleSubmit = async () => {
        if (!specName.trim()) {
            alert("規格名を入力してください");
            return;
        }
        try {
            await addSpec(specName, currentUser);
            setSpecName('');
            onAdd();  // 重新加载规格
            onClose();
        } catch (err) {
            console.error(err);
            alert("登録に失敗しました");
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ p: 3, bgcolor: 'white', mx: 'auto', my: '20%', width: 400 }}>
                <Typography variant="h6">新規規格追加</Typography>
                <TextField
                    fullWidth
                    label="規格・仕様"
                    value={specName}
                    onChange={(e) => setSpecName(e.target.value)}
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
