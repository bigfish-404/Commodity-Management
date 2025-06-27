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


export const sellProduct = async (product, currentUser) => {
  const payload = {
    userId: currentUser.userId, // VARCHAR2(50)
    productId: product.productId, // VARCHAR2(50)
    categoryId: product.categoryId, // VARCHAR2(50)
    specId: product.specId, // VARCHAR2(50)
    channelId: product.channelId, // NUMBER(19,0)
    deliveryMethodId: product.deliveryMethodId, // NUMBER(19,0)

    salesPrice: parseFloat(product.salesPrice),
    profit: parseFloat(product.profit),
    quantity: parseInt(product.quantity),
    salesPerson: currentUser.name,
    salesDate: new Date(),

    updatedBy: currentUser.name,
    createdBy: currentUser.name,
    deletedFlg: '0'
  };

  try {
    const response = await axios.post('/api/salesInput/submit', payload);
    return response.data;
  } catch (error) {
    console.error("❌ error：", error);
    throw error;
  }
};


