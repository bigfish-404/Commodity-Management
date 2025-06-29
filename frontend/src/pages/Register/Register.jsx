// Register.jsx
import React, { useState } from 'react';
import { Helmet } from "react-helmet-async";
import CryptoJS from 'crypto-js';
import { useNavigate, Link } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
    Snackbar,
    Alert
} from '@mui/material';

import HeaderRegister from '../../components/Header/HeaderRegister';

function Register() {
    const [username, setUsername] = useState("");
    const [email, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [successOpen, setSuccessOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email || !password || !confirmPassword) {
            alert("すべてのフィールドを入力してください。");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("有効なメールアドレスを入力してください。");
            return;
        }

        if (password !== confirmPassword) {
            alert("パスワードが一致しません。");
            return;
        }

        const encryptedPassword = CryptoJS.SHA256(password).toString();

        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                username,
                email,
                password: encryptedPassword,
                confirmPassword: encryptedPassword
            })
        });

        const result = await response.json();
        if (response.ok) {
            setSuccessOpen(true);
            setTimeout(() => navigate("/"), 1500);
        } else {
            alert(result.message || '登録に失敗しました');
        }
    };

    return (
        <>
            <Helmet>
                <title>新規登録</title>
            </Helmet>

            <HeaderRegister />

            <Box sx={{
                minHeight: '100vh',
                background: 'radial-gradient(circle at top left, #fdfdfd, #f5f3f1, #f0eeeb)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                pt: 6,
                overflow: 'hidden'
            }}>
                <Container maxWidth="sm" sx={{ mt: 0 }}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                        <Typography variant="h5" align="center" fontWeight="bold" color="#5a3d28" mb={3}>
                            新規登録
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                label="ユーザー名"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                label="メールアドレス"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="email"
                                value={email}
                                onChange={(e) => setMail(e.target.value)}
                            />
                            <TextField
                                label="パスワード"
                                variant="outlined"
                                type="password"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <TextField
                                label="パスワードを確認"
                                variant="outlined"
                                type="password"
                                fullWidth
                                margin="normal"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    bgcolor: '#a88d72',
                                    boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.1)',
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        bgcolor: '#8b6b51',
                                        boxShadow: 'inset 0 -2px 6px rgba(0,0,0,0.25), 0 6px 12px rgba(0,0,0,0.15)'
                                    }
                                }}
                            >
                                登録
                            </Button>
                        </Box>

                        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                            すでにアカウントをお持ちの方は{' '}
                            <Link to="/" style={{ color: '#5a3d28', fontWeight: 'bold', textDecoration: 'none' }}>
                                ログイン
                            </Link>
                        </Typography>
                    </Paper>
                </Container>
            </Box>

            <Snackbar open={successOpen} autoHideDuration={2000} onClose={() => setSuccessOpen(false)}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    登録が成功しました！
                </Alert>
            </Snackbar>
        </>
    );
}

export default Register;
