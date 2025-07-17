// src/services/specService.js
import axios from 'axios';

const API_BASE = '/api';

export const fetchSpecs = async (userId) => {
    const res = await axios.get(`${API_BASE}/getAllSpecs`, { params: { userId } });
    return res.data;
};

export const addSpec = async (spec) => {
    const res = await axios.post(`${API_BASE}/addSpecs`, spec);
    return res.data;
};

export const updateSpec = async (spec) => {
    const res = await axios.post(`${API_BASE}/updateSpecs`, spec);
    return res.data;
};

export const deleteSpec = async (id) => {
  const res = await axios.post('/api/deleteSpecs', { id });
  return res.data;
};
