import axios from 'axios';


//定义一个异步函数关键字async，获得List
export const fetchProducts = async (currentUser, offset, limit, orderBy, orderDirection) => {
    try {
        const response = await axios.get('/api/productList', {
            params: {
                userId: currentUser.userId, 
                offset,
                limit,
                orderBy,
                orderDirection
            }
        });
        return response.data;
    } catch (error) {
        console.error("error", error);
        return [];
    }
};


export const fetchTotalCount = async (currentUser) => {
    const response = await axios.get('/api/productListCount', {
         params: {
                userId: currentUser.userId
         }
    });
    return response.data;
};


//取得所以品番
export const fetchProductInfo = async (currentUser) => {
    const response = await axios.get('/api/getAllProductInfo', {
        params: { userId: currentUser.userId }
    });
    return response.data.length > 0 ? response.data : [];
};

// 取得所有分类
export const fetchCategories = async (currentUser) => {
    const response = await axios.get('/api/getAllCategories', {
        params: { userId: currentUser.userId }
    });
    return response.data.length > 0 ? response.data : [];
};

// 取得所有规格
export const fetchSpecs = async (currentUser) => {
    const response = await axios.get('/api/getAllSpecs', {
        params: { userId: currentUser.userId }
    });
    return response.data.length > 0 ? response.data : [];
};

//获得配送方法
export const fetchDeliverys = async (currentUser) => {
    const response = await axios.get('/api/getAllDeliveryMethod', {
        params: { userId: currentUser.userId }
    });
    return response.data.length > 0 ? response.data : [];
};

//更新
export const updateProduct = async (formData) => {
  try {
    const response = await axios.put('/api/updateProduct', formData);
    return response.data;
  } catch (error) {
    console.error('商品更新失败:', error);
    throw error;
  }
};

//删除
export const deleteProduct = async (formData) => {
  try {
    const response = await axios.put('/api/deleteProduct', formData);
    return response.data;
  } catch (error) {
    console.error('商品削除失败:', error);
    throw error;
  }
};