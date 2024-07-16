import { login, register } from "../api/AccountAPI";
import { getProfileDetail } from "../api/IdentityAPI";

class AuthService {
  async login(username, password) {
    try {
      return await login({ username, password });
    } catch (error) {
      console.error('An error occured during AuthService.login : ', error); 
    }
  };

  async register(username, email, password) {
    try {
      return await register({ username, email, password });
    } catch (error) {
      console.error('An error occured during AuthService.register : ', error);
    }
  }

  async getCurrentUser() {
    try {
      return await getProfileDetail();
    } catch (error) {
      console.error('An error occured during AuthService.getCurrentUser : ', error);
    }
  }
}

export default new AuthService();