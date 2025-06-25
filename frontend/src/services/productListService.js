import axios from 'axios';


//定义一个异步函数关键字async，接受5个参数
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

export const updateProduct = async (productData) => {
  await axios.put('/api/updateProduct', productData);
};
