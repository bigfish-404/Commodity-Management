import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  FormLabel
} from '@mui/material';
import './Channel.css';
import { addChannel } from '../../services/channelService';

function Channel() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const [channelName, setChannelName] = useState('');
  const [handlingFee, setHandlingFee] = useState('');

  const handleAdd = async () => {
    if (!channelName.trim()) {
      alert('チャネル名を入力してください');
      return;
    }

    if (!handlingFee || isNaN(parseFloat(handlingFee))) {
      alert('手数料は数値で入力してください');
      return;
    }

    try {
      await addChannel({
        userId: currentUser.userId,
        channelName: channelName.trim(),
        handlingFee: parseFloat(handlingFee),
        createdBy: currentUser.name,
        updatedBy: currentUser.name
      });
      alert('追加成功');
      setChannelName('');
      setHandlingFee('');
    } catch (err) {
      alert('追加失敗');
      console.error(err);
    }
  };

  return (
    <>
      <Helmet>
        <title>販売チャネル</title>
      </Helmet>
      <Box className="channel-box">
        <Typography variant="h5" className="channel-title">販売チャネル追加</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormLabel>チャネル名</FormLabel>
            <TextField
              fullWidth
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              size="small"
              placeholder="メルカリ"
            />
          </Grid>

          <Grid item xs={6}>
            <FormLabel>手数料（％）</FormLabel>
            <TextField
              fullWidth
              value={handlingFee}
              onChange={(e) => setHandlingFee(e.target.value)}
              size="small"
              placeholder="10.0"
              inputProps={{ inputMode: 'decimal', pattern: '\\d*\\.?\\d{0,2}' }}
            />
          </Grid>

          <Grid item xs={12} className="channel-buttons">
            <Button variant="contained" color="primary" onClick={handleAdd}>
              追加
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Channel;
