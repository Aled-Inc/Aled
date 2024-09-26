import { addProduct, getInventoryProducts, getInventoryDetails } from '../../api/InventoryAPI';

class InventoryService {
  async addProduct(product = { code }) {
    try {
      return await addProduct(product);
    } catch (error) {
      console.error(
        'An error occured during InventoryService.addProduct : ',
        error,
      );
    }
  }

  async getInventoryDetails() {
    try {
      return await getInventoryDetails();
    } catch (error) {
      console.error(
        'An error occured during InventoryService.getInventory : ',
        error,
      );
    }
  }

  async getInventoryProducts(filter, sorting, skipCount, maxResultCount) {
    try {
      let body = {
        Filter: filter,
        Sorting: sorting,
        SkipCount: skipCount,
        MaxResultCount: maxResultCount,
      };

      return await getInventoryProducts(body);
    } catch (error) {
      console.error(
        'An error occured during InventoryService.getInventoryProducts : ',
        error,
      );
    }
  }
}

export default new InventoryService();
