import InventoryService from '../../../business/services/InventoryService';
import { addProduct, getInventoryProducts, getInventoryDetails } from '../../../api/InventoryAPI';

jest.mock('../../../api/InventoryAPI', () => ({
  addProduct: jest.fn(),
  getInventoryProducts: jest.fn(),
  getInventoryDetails: jest.fn(),
}));

describe('InventoryService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
  });

  test('should add product successfully', async () => {
    const product = { code: 'P001', expirationDate: '2024-12-31' };
    addProduct.mockResolvedValue({ success: true });

    const result = await InventoryService.addProduct(product);

    expect(addProduct).toHaveBeenCalledWith(product);
    expect(result).toEqual({ success: true });
  });

  test('should catch and log error in addProduct', async () => {
    const product = { code: 'P001', expirationDate: '2024-12-31' };
    const error = new Error('API Error');
    addProduct.mockRejectedValue(error);

    const result = await InventoryService.addProduct(product);

    expect(addProduct).toHaveBeenCalledWith(product);
    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      'An error occured during InventoryService.addProduct : ',
      error
    );
  });

  test('should get inventory details successfully', async () => {
    const inventoryDetails = { totalProducts: 100, totalValue: 5000 };
    getInventoryDetails.mockResolvedValue(inventoryDetails);

    const result = await InventoryService.getInventoryDetails();

    expect(getInventoryDetails).toHaveBeenCalled();
    expect(result).toEqual(inventoryDetails);
  });

  test('should catch and log error in getInventoryDetails', async () => {
    const error = new Error('API Error');
    getInventoryDetails.mockRejectedValue(error);

    const result = await InventoryService.getInventoryDetails();

    expect(getInventoryDetails).toHaveBeenCalled();
    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      'An error occured during InventoryService.getInventory : ',
      error
    );
  });

  test('should get inventory products successfully', async () => {
    const filter = 'Product1';
    const sorting = 'name';
    const skipCount = 0;
    const maxResultCount = 10;
    const products = [{ code: 'P001', name: 'Product1' }];
    getInventoryProducts.mockResolvedValue(products);

    const result = await InventoryService.getInventoryProducts(filter, sorting, skipCount, maxResultCount);

    expect(getInventoryProducts).toHaveBeenCalledWith({
      Filter: filter,
      Sorting: sorting,
      SkipCount: skipCount,
      MaxResultCount: maxResultCount,
    });
    expect(result).toEqual(products);
  });

  test('should catch and log error in getInventoryProducts', async () => {
    const filter = 'Product1';
    const sorting = 'name';
    const skipCount = 0;
    const maxResultCount = 10;
    const error = new Error('API Error');
    getInventoryProducts.mockRejectedValue(error);

    const result = await InventoryService.getInventoryProducts(filter, sorting, skipCount, maxResultCount);

    expect(getInventoryProducts).toHaveBeenCalledWith({
      Filter: filter,
      Sorting: sorting,
      SkipCount: skipCount,
      MaxResultCount: maxResultCount,
    });
    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      'An error occured during InventoryService.getInventoryProducts : ',
      error
    );
  });
});
