import api from './API';

export const addProduct = async product =>
  await api.post('/api/app/inventory/product', product);

export const getInventoryDetails = async () => await api.get('/api/app/inventory/details');
export const getInventoryProducts = async (body) => await api.get('/api/app/inventory/products', { params: body});
