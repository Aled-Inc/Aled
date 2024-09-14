import { addProduct } from '../api/InventoryAPI';
import { getInventory } from '../api/InventoryAPI';

class InventoryService {
  async addProduct(product = { code, expirationDate }) {
    try {
      return await addProduct(product);
    } catch (error) {
      console.error(
        'An error occured during InventoryService.addProduct : ',
        error,
      );
    }
  }

  async getInventory() {
    try {
      return await getInventory();
    } catch (error) {
      console.error(
        'An error occured during InventoryService.getInventory : ',
        error,
      );
    }
  }
}

export default new InventoryService();
