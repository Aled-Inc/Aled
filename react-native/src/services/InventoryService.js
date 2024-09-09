import { addProduct } from "../api/InventoryAPI";

class InventoryService {
  async addProduct(product = { code, expirationDate }) {
    try {
      return await addProduct(product);
    } catch(error) {
      console.error('An error occured during InventoryService.addProduct : ', error);
    }
  }
}

export default new InventoryService();