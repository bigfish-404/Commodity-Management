import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import './ConfirmDeleteDialog.css'; // 自定义样式

export default function ConfirmDeleteDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose} className="confirm-delete-dialog">
      <DialogTitle className="dialog-title">確認</DialogTitle>
      <DialogContent className="dialog-content">
        この商品を本当に削除しますか？
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={onClose} color="inherit" variant="outlined">いいえ</Button>
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus>はい</Button>
      </DialogActions>
    </Dialog>
  );
}
