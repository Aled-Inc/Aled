import { getProductDetails } from '../../api/ProductAPI';

class ProductService {
  async getProductDetails(code) {
    try {
      return await getProductDetails(code);
    } catch (error) {
      console.error(
        'An error occured during ProductService.getProductDetails : ',
        error,
      );
    }
  }
}

export default new ProductService();
