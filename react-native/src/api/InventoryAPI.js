import api from './API';

export const addProduct = async(product) => await api.post('/api/app/inventory/product', product);