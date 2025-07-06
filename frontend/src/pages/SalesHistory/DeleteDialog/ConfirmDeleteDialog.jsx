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
  dialogPaperSx,
  titleSx,
  messageSx,
  cancelButtonSx,
  confirmButtonSx,
} from './confirmDeleteDialogStyles';

export default function ConfirmDeleteDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}
      PaperProps={{ sx: dialogPaperSx }}
    >
      <DialogTitle sx={titleSx}>確認</DialogTitle>
      <DialogContent>
        <Typography sx={messageSx}>
          この販売履歴を削除してもよろしいですか？
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-end', px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={cancelButtonSx}>
          いいえ
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error" sx={confirmButtonSx}>
          はい
        </Button>
      </DialogActions>
    </Dialog>
  );
}
