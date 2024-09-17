import api from './API';

export const getProductDetails = async code =>
  await api.get(`/api/app/product?code=${code}`);
