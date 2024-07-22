import { getCurrentUserId, login, Logout, register } from "../api/AccountAPI";
import { getCurrentUser, getProfileDetail, getUserById } from "../api/IdentityAPI";

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
      return await getCurrentUser();
    } catch (error) {
      console.error('An error occured during AuthService.getCurrentUser : ', error);
    }
  }

  async logout(input = {client_id: '', token: '', token_type_hint: ''}) {
    try {
      return await Logout(input);
    }
    catch (error) {
      console.error('An error occured during AuthService.logout : ', error);
    }
  }
}

export default new AuthService();