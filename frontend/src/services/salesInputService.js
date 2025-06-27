import axios from "axios";

/**
 * 获取指定用户 + 渠道下的商品（库存 > 0）
 * @param {Object} currentUser 当前用户对象
 * @param {number} channelId 渠道ID
 * @returns {Promise<Array>}
 */
export const fetchSalesData = async (currentUser, channelId) => {
  try {
    const userId = currentUser?.userId;
    if (!userId || !channelId) {
      console.warn("⚠️ 用户ID或渠道ID缺失");
      return [];
    }

    const response = await axios.get(`/api/salesInput/getAll`, {
      params: { userId, channelId },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error fetching sales data:", error);
    return [];
  }
};

/**
 * 商品销售请求（插入 PROFIT 表）
 * @param {Object} product 商品数据（包含价格、数量、利润等）
 * @param {Object} currentUser 当前登录用户
 */
export const sellProduct = async (product, currentUser,channelId) => {
  const payload = {
    productName: product.productName,
    category: product.categoryName,
    spec: product.specName,
    platform: channelId,
    salesPrice: parseFloat(product.salesPrice),
    profit: parseFloat(product.profit),
    quantity: parseInt(product.quantity),
    salesPerson: currentUser.name,
    salesDate: new Date(),
    updatedBy: currentUser.name,
    createdBy: currentUser.name,
    deletedFlg: '0',
    userId: currentUser.id
  };

  try {
    const response = await axios.post('/api/sellProductSubmit', payload);
    return response.data;
  } catch (error) {
    console.error("❌ error：", error);
    throw error;
  }
};

