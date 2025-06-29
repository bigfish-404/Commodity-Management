// HeaderRegister.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

export default function HeaderRegister() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '72px',
        backgroundImage: 'linear-gradient(135deg, #fdfcfa, #f3f1ed)',
        boxShadow: 'inset 0 -1px 2px rgba(255,255,255,0.5), 0 2px 6px rgba(0,0,0,0.08)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 4,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: '#5a3d28',
          letterSpacing: 1,
          fontFamily: `'Segoe UI', 'Noto Sans JP', sans-serif`,
        }}
      >
        StockHub
      </Typography>
    </Box>
  );
}
