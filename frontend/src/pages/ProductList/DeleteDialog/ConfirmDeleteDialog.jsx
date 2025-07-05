import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import {
  confirmDialogPaperSx,
  confirmTitleSx,
  confirmContentTextSx,
  confirmActionsSx,
} from './ConfirmDeleteDialogStyles';

export default function ConfirmDeleteDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: confirmDialogPaperSx,
      }}
    >
      <DialogTitle sx={confirmTitleSx}>確認</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={confirmContentTextSx}>
          この商品を本当に削除しますか？
        </Typography>
      </DialogContent>
      <DialogActions sx={confirmActionsSx}>
        <Button onClick={onClose} color="inherit" variant="outlined">
          いいえ
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
          はい
        </Button>
      </DialogActions>
    </Dialog>
  );
}
