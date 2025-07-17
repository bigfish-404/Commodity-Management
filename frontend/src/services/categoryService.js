import axios from 'axios';

const API_BASE = '/api';

export const fetchCategorys = async (userId) => {
    const res = await axios.get(`${API_BASE}/getAllCategories`, { params: { userId } });
    return res.data;
};

export const addCategory = async (category) => {
    const res = await axios.post(`${API_BASE}/addCategori`, category);
    return res.data;
};

export const updateCategory = async (category) => {
    const res = await axios.post(`${API_BASE}/updateCategory`, category);
    return res.data;
};

export const deleteCategory = async (id) => {
    const res = await axios.post(`${API_BASE}/deleteCategory`, null, {
        params: { id }
    });
    return res.data;
};