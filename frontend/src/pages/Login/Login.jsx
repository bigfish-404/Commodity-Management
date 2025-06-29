// Login.jsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  Avatar
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

import HeaderRegister from '../../components/Header/HeaderRegister';

export default function Login() {
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('メールアドレスとパスワードを入力してください');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('正しいメールアドレスを入力してください');
      return;
    }

    const encryptedPassword = CryptoJS.SHA256(password).toString();

    try {
      const response = await axios.post('/api/login', {
        email,
        password: encryptedPassword,
      }, {
        withCredentials: true,
      });

      const userData = response.data;
      localStorage.setItem('currentUser', JSON.stringify(userData));
      navigate('/api/homepage');
    } catch (error) {
      alert(error?.response?.data?.message || 'ログインに失敗しました。');
    }
  };

  return (
    <>
      <Helmet>
        <title>ログイン</title>
      </Helmet>

      <HeaderRegister />

      <Container maxWidth="sm">
        <Box
          sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper elevation={3} sx={{ p: 5, width: '100%', borderRadius: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: '#a88d72' }}>L</Avatar>
            </Box>

            <Typography component="h1" variant="h5" align="center" color="#5a3d28" fontWeight="bold">
              ログイン
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                label="メールアドレス"
                variant="outlined"
                fullWidth
                margin="normal"
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: '#a88d72',
                  '&:hover': {
                    bgcolor: '#8b6b51',
                  },
                }}
              >
                ログイン
              </Button>

              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                アカウントをお持ちでない方は{' '}
                <MuiLink component={Link} to="/api/register" underline="hover" sx={{ color: '#5a3d28', fontWeight: 'bold' }}>
                  新規登録
                </MuiLink>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
}
