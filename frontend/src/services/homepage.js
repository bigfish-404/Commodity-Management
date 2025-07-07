import axios from 'axios';

export const fetchMonthlyOverview = async (userId) => {
  try {
    const res = await axios.get('/api/homepage/overview', {
      params: { userId }
    });
    return res.data;
  } catch (error) {
    console.error('月次概要取得失敗:', error);
    return { salesTotal: 0, profitTotal: 0 }; // fallback 默认值
  }
};

export const fetchsalesSummaryFlexibleStyles = async (userId, range) => {
    if (!userId) return [];

    try {
        const res = await axios.get('/api/homepage/stats', {
            params: { userId, range }
        });
        return res.data;
    } catch (err) {
        console.error('メインチャート取得失敗:', err);
        return [];
    }
};