import axios from 'axios';

export const fetchProducts = async (userId, offset, limit, orderBy, orderDirection) => {
    const response = await axios.get(`/api/products/${userId}`, {
        params: { offset, limit, orderBy, orderDirection }
    });
    return response.data;
};


export const fetchTotalCount = async (userId) => {
    const response = await axios.get(`/api/products/${userId}/count`);
    return response.data;
};
