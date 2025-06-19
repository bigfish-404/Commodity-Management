import axios from 'axios';


//定义一个异步函数关键字async，接受5个参数
export const fetchProducts = async (userId, offset, limit, orderBy, orderDirection) => {

    try {
        //向服务器发送一个GET请求URL 是：/api/products/${userId}。
        const response = await axios.get(`/api/productList/${userId}`, {
            //传入一个配置对象，里面有params的属性
            //这种写法就相当于axios.get("/api/products/2?offset=0&limit=10&orderBy=price&orderDirection=asc")
            params: { offset, limit, orderBy, orderDirection }
        });
        return response.data;
    }catch(error){
        console("error", error);
        return [];
    }
};


export const fetchTotalCount = async (userId) => {
    const response = await axios.get(`/api/productList/${userId}/count`);
    return response.data;
};
