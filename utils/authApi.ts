import axios from 'axios';
import { getCookie } from './cookies';

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || process.env.VITE_API_BASE_URL || 'https://swiftlyxpress.com';

const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: true
});

client.interceptors.request.use((config) => {
  const token = getCookie('customer_token') || getCookie('auth_token') || getCookie('rider_token') || getCookie('admin_token');
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const createDelivery = async (payload: any) => {
  try {
    if (typeof FormData !== 'undefined' && payload instanceof FormData) {
      const res = await client.post('/api/customer/deliveries', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data;
    }

    const res = await client.post('/api/customer/deliveries', payload);
    return res.data;
  } catch (err) {
    console.error('createDelivery error', err);
    throw err;
  }
};

export const isAuthenticated = () => {
  try {
    return Boolean(getCookie('customer_token') || getCookie('auth_token'));
  } catch (e) {
    return false;
  }
};

export const cancelDelivery = async (id: string, opts?: any) => {
  try {
    const res = await client.post(`/api/customer/deliveries/${id}/cancel`, opts || {});
    return res.data;
  } catch (err) {
    console.error('cancelDelivery error', err);
    throw err;
  }
};

export default { createDelivery, isAuthenticated, cancelDelivery };
