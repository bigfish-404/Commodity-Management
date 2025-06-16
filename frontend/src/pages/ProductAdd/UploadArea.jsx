import React, { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function UploadArea({ onFileSelect }) {
    const fileInputRef = useRef();

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileSelect(e.target.files[0]);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            onFileSelect(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <Box
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            sx={{
                border: '1px dashed #ccc',
                borderRadius: '5px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer'
            }}
            onClick={() => fileInputRef.current.click()}
        >
            <CloudUploadIcon sx={{ fontSize: 40, color: '#ff9800' }} />
            <Typography variant="body2" mt={1}>Drag and drop a file to upload</Typography>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </Box>
    );
}
