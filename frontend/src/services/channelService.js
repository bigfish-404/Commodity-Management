import axios from 'axios';

// 获取所有渠道（传 userId 在请求体中）
export const fetchChannelsByUserId = async (userId) => {
  try {
    const response = await axios.get('/api/channel/getAll', {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("❌ チャネル取得失敗:", error);
    throw error;
  }
};

// 更新渠道（手续费等）
export const updateChannel = async (payload) => {
  try {
    const response = await axios.post('/api/channel/update', payload);
    return response.data;
  } catch (error) {
    console.error('チャネル更新失敗:', error);
    throw error;
  }
};

// 删除渠道（将 id 放在 body 中）
export const deleteChannel = async (payload) => {
  try {
    const response = await axios.post('/api/channel/delete', payload); // payload: { id: xxx }
    return response.data;
  } catch (error) {
    console.error('チャネル削除失敗:', error);
    throw error;
  }
};

// 添加新渠道
export const addChannel = async (payload) => {
  try {
    const response = await axios.post('/api/channel/add', payload);
    return response.data;
  } catch (error) {
    console.error('チャネル追加失敗:', error);
    throw error;
  }
};
