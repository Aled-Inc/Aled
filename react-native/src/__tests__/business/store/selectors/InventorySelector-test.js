import { createProductSelector, createScanProductsSelector, createInventorySelector } from '../../../../business/store/selectors/InventorySelector';

describe('Inventory Selectors', () => {
  const mockState = {
    inventory: {
      inventory: {
        products: [
          { id: 1, name: 'Product A' },
          { id: 2, name: 'Product B' },
        ],
        details: {},
        totalProducts: 2,
      },
      scannedProducts: [
        { id: 3, name: 'Product C' },
      ],
    },
  };

  describe('createProductSelector', () => {
    it('should select the products from inventory', () => {
      const selector = createProductSelector();
      const result = selector(mockState);
      expect(result).toEqual(mockState.inventory.inventory.products);
    });

    it('should return undefined if products do not exist', () => {
      const stateWithoutProducts = {
        inventory: {
          inventory: {},
          scannedProducts: [],
        },
      };
      const selector = createProductSelector();
      const result = selector(stateWithoutProducts);
      expect(result).toBeUndefined();
    });
  });

  describe('createScanProductsSelector', () => {
    it('should select the scanned products from inventory', () => {
      const selector = createScanProductsSelector();
      const result = selector(mockState);
      expect(result).toEqual(mockState.inventory.scannedProducts);
    });

    it('should return an empty array if scanned products do not exist', () => {
      const stateWithoutScannedProducts = {
        inventory: {
          inventory: { products: [] },
          scannedProducts: [],
        },
      };
      const selector = createScanProductsSelector();
      const result = selector(stateWithoutScannedProducts);
      expect(result).toEqual([]);
    });
  });

  describe('createInventorySelector', () => {
    it('should select the inventory from inventory store', () => {
      const selector = createInventorySelector();
      const result = selector(mockState);
      expect(result).toEqual(mockState.inventory.inventory);
    });

    it('should return undefined if inventory does not exist', () => {
      const stateWithoutInventory = {
        inventory: {
          scannedProducts: [],
        },
      };
      const selector = createInventorySelector();
      const result = selector(stateWithoutInventory);
      expect(result).toBeUndefined();
    });
  });
});