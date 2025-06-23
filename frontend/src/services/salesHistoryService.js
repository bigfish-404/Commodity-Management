import axios from "axios";

export const fetchAllsalesHistoryByUserId = async (currentUser) => {
    try{
        const response =await axios.get(`/api/sales-history/${currentUser.id}`);
        return response.data;
    }catch(error){
        console.error("Error fetching SalesHistory",error)
        return [];
    }
}



/**
 * 更新 Profit 记录（如果有变化才更新）
 * @param {Object} profit - 前端表单对象
 * @returns {Promise<string>} - 返回消息（更新成功 or 无需更新）
 */
export const updateProfit = async (profit) => {
  try {
    const res = await axios.post('/api/updateProfit', profit);
    return res.data; // "更新成功" 或 "无变更，无需更新"
  } catch (err) {
    console.error('❌ 更新失败:', err);
    throw err;
  }
};


// 删除销售记录（逻辑删除）
export const deleteProfitById = async (profitId) => {
  const response = await axios.post('/api/profit/delete', { id: profitId });
  return response.data;
};

// 恢复库存（传入销售记录）
export const increaseProductStock = async (item) => {
  const response = await axios.post('/api/product/increase-stock', {
    productName: item.productName,
    quantity: item.quantity
  });
  return response.data;
};
