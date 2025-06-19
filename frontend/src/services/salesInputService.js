import axios from "axios";

/**
 * 获取指定用户 + 渠道下的商品（库存 > 0）
 * @param {number} userId 
 * @param {number} channelId 
 * @returns {Promise<Array>}
 */
export const fetchSalesData = async (userId, channelId) => {
  try {
    const response = await axios.get(`/api/salesInput/${userId}/${channelId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sales data:", error);
    return [];
  }
};

/**
 * 获取所有渠道平台信息（一次性加载）
 * @returns {Promise<Object>} 如 { channelMap: {...}, displayMap: {...} }
 */




