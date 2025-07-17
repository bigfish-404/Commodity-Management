import axios from 'axios';

const API_BASE = '/api';

export const fetchProducts = async (userId) => {
    const res = await axios.get(`${API_BASE}/getAllProductInfo`, { params: { userId } });
    return res.data;
};

export const addProduct = async (product) => {
    const res = await axios.post(`${API_BASE}/addProductInfo`, product);
    return res.data;
};

export const updateProduct = async (product) => {
    const res = await axios.post(`${API_BASE}/updateProductInfo`, product);
    return res.data;
};

export const deleteProduct = async (id) => {
    const res = await axios.post(`${API_BASE}/deleteProductInfo`, null, {
        params: { id }
    });
    return res.data;
};