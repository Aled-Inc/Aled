import ProductService from '../../../business/services/ProductService';
import { getProductDetails } from '../../../api/ProductAPI';

jest.mock('../../../api/ProductAPI', () => ({
  getProductDetails: jest.fn(),
}));

describe('ProductService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
  });

  test('should get product details successfully', async () => {
    const code = 'P001';
    const productDetails = { code: 'P001', name: 'Product 1', price: 100 };
    getProductDetails.mockResolvedValue(productDetails);

    const result = await ProductService.getProductDetails(code);

    expect(getProductDetails).toHaveBeenCalledWith(code);
    expect(result).toEqual(productDetails);
  });

  test('should catch and log error in getProductDetails', async () => {
    const code = 'P001';
    const error = new Error('API Error');
    getProductDetails.mockRejectedValue(error);

    const result = await ProductService.getProductDetails(code);

    expect(getProductDetails).toHaveBeenCalledWith(code);
    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      'An error occured during ProductService.getProductDetails : ',
      error
    );
  });
});
