import { changePassword, deleteProfile, disableProfile, updateProfileDetail } from "../api/IdentityAPI";

const prepareModel = (user) => {
  return {
    userName: user.userName,
    email: user.email,
    name: user.name,
    surname: user.surname,
    phoneNumber: user.phoneNumber
  }
};

class AccountService {

  async updateUsername(username, user) {
    try {
      let model = prepareModel(user);
      model.userName = username;

      return await updateProfileDetail(model);
    } catch (error) {
      console.error('An error occured during AccountService.updateUsername : ', error);
      throw error;
    }
  }

  async updateName(name, user) {
    try {
      let model = prepareModel(user);
      model.name = name;

      return await updateProfileDetail(model);
    } catch (error) {
      console.error('An error occured during AccountService.updateName : ', error);
      throw error;
    }
  }

  async updateSurname(surname, user) {
    try {
      let model = prepareModel(user);
      model.surname = surname;

      return await updateProfileDetail(model);
    } catch (error) {
      console.error('An error occured during AccountService.updateSurname : ', error);
      throw error;
    }
  }

  async updateEmail(email, user) {
    try {
      let model = prepareModel(user);
      model.email = email;

      return await updateProfileDetail(model);
    } catch (error) {
      console.error('An error occured during AccountService.updateEmail : ', error);
      throw error;
    }
  }

  async updatePhone(phone, user) {
    try {
      let model = prepareModel(user);
      model.phoneNumber = phone;

      return await updateProfileDetail(model);
    } catch (error) {
      console.error('An error occured during AccountService.updatePhone : ', error);
      throw error;
    }
  }

  async changePassword(currentPassword, newPassword) {
    try {
      return await changePassword({currentPassword, newPassword});
    } catch (error) {
      console.error('An error occured during AccountService.changePassword : ', error);
      throw error;
    }
  }

  async disableProfile() {
    try {
      return await disableProfile();
    } catch (error) {
      console.error('An error occured during AccountService.disableProfile : ', error);
      throw error;
    }
  }

  async deleteProfile() {
    try {
      return await deleteProfile();
    } catch (error) {
      console.error('An error occured during AccountService.deleteProfile : ', error);
      throw error;
    }
  }
}

export default new AccountService();