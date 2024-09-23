import reducer from '../../../../business/store/reducers/InventoryReducer';
import InventoryActions from '../../../../business/store/actions/InventoryActions';

describe('Inventory Reducer', () => {
  const initialState = {
    inventory: { products: [], details: {}, totalProducts: 0 },
    scannedProducts: [],
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle addProductToInventory', () => {
    const product = { id: 1, name: 'Product 1' };
    const action = InventoryActions.addProductToInventory(product);

    const expectedState = {
      ...initialState,
      inventory: {
        ...initialState.inventory,
        products: [product],
      },
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle addProductToScannedProducts', () => {
    const scannedProduct = { id: 2, name: 'Scanned Product' };
    const action = InventoryActions.addProductToScannedProducts(scannedProduct);

    const expectedState = {
      ...initialState,
      scannedProducts: [scannedProduct],
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle clearScannedProducts', () => {
    const initialStateWithScannedProducts = {
      ...initialState,
      scannedProducts: [{ id: 2, name: 'Scanned Product' }],
    };
    const action = InventoryActions.clearScannedProducts();

    const expectedState = {
      ...initialState,
      scannedProducts: [],
    };

    expect(reducer(initialStateWithScannedProducts, action)).toEqual(expectedState);
  });

  it('should handle setInventoryDetails', () => {
    const details = { location: 'Warehouse A' };
    const action = InventoryActions.setInventoryDetails(details);

    const expectedState = {
      ...initialState,
      inventory: {
        ...initialState.inventory,
        details,
      },
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setInventoryProducts', () => {
    const payload = {
      items: [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }],
      totalCount: 2,
    };
    const action = InventoryActions.setInventoryProducts(payload);

    const expectedState = {
      ...initialState,
      inventory: {
        ...initialState.inventory,
        products: payload.items,
        totalProducts: payload.totalCount,
      },
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
