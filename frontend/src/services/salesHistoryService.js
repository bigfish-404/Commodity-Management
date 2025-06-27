import axios from "axios";

export const fetchAllsalesHistoryByUserId = async (currentUser) => {
  try {
    const response = await axios.get('/api/salesHistory/list', {
      params: { userId: currentUser.userId } 
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching SalesHistory:', error);
    return [];
  }
};



/**
 * 更新 Profit 记录（如果有变化才更新）
 * @param {Object} profit - 前端表单对象
 * @returns {Promise<string>} - 返回消息（更新成功 or 无需更新）
 */
export const updateProfit = async (profit) => {
  try {
    const res = await axios.post('/api/salesHistory/update', profit);
    return res.data; // "更新成功" 或 "无变更，无需更新"
  } catch (err) {
    console.error('❌ 更新失败:', err);
    throw err;
  }
};


export const deleteProfit = async (profitItem) => {
  try {
    const response = await axios.post('/api/salesHistory/delete', profitItem);
    return response.data;
  } catch (error) {
    console.error('❌ 削除失敗:', error);
    throw error;
  }
};
