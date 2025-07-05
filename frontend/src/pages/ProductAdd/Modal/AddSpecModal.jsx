import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { addSpec } from '../../../services/productAddService';
import { modalStyle, titleSx, buttonBoxSx } from './ModalStyleItem';
import {
    checkSpecName
} from '../../../utils/validators';

export default function AddSpecModal({ open, onClose, onAdd }) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [specName, setSpecName] = useState('');

    const handleSubmit = async () => {
        const result = checkSpecName(specName);
        if (!result.valid) {
            alert(result.message);
            return;
        }

        try {
            await addSpec(specName, currentUser);
            setSpecName('');
            onAdd();    // 規格リストを再取得
            onClose();  // モーダルを閉じる
        } catch (err) {
            console.error(err);
            alert("登録に失敗しました");
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" sx={titleSx}>新規規格追加</Typography>
                <TextField
                    fullWidth
                    label="規格・仕様"
                    value={specName}
                    onChange={(e) => setSpecName(e.target.value)}
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
