import AccountService from '../../../business/services/AccountService';
import {
  changePassword,
  deleteProfile,
  disableProfile,
  sendEmailVerificationCode,
  updateProfileDetail,
} from '../../../api/IdentityAPI';

jest.mock('../../../api/IdentityAPI', () => ({
  changePassword: jest.fn(),
  deleteProfile: jest.fn(),
  disableProfile: jest.fn(),
  sendEmailVerificationCode: jest.fn(),
  updateProfileDetail: jest.fn(),
}));

describe('AccountService', () => {
  const user = {
    userName: 'testUser',
    email: 'test@example.com',
    name: 'Test',
    surname: 'User',
    phoneNumber: '1234567890',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
  });

  test('should update username successfully', async () => {
    const username = 'newUsername';
    updateProfileDetail.mockResolvedValue({ success: true });

    const result = await AccountService.updateUsername(username, user);

    expect(updateProfileDetail).toHaveBeenCalledWith({
      ...user,
      userName: username,
    });
    expect(result).toEqual({ success: true });
  });

  test('should catch and log error in updateUsername', async () => {
    const error = new Error('API Error');
    updateProfileDetail.mockRejectedValue(error);

    await expect(AccountService.updateUsername('newUsername', user)).rejects.toThrow('API Error');
    expect(console.error).toHaveBeenCalledWith(
      'An error occured during AccountService.updateUsername : ',
      error
    );
  });

  test('should update name successfully', async () => {
    const newName = 'NewName';
    updateProfileDetail.mockResolvedValue({ success: true });

    const result = await AccountService.updateName(newName, user);

    expect(updateProfileDetail).toHaveBeenCalledWith({
      ...user,
      name: newName,
    });
    expect(result).toEqual({ success: true });
  });

  test('should catch and log error in updateName', async () => {
    const error = new Error('API Error');
    updateProfileDetail.mockRejectedValue(error);

    await expect(AccountService.updateName('NewName', user)).rejects.toThrow('API Error');
    expect(console.error).toHaveBeenCalledWith(
      'An error occured during AccountService.updateName : ',
      error
    );
  });

  test('should update surname successfully', async () => {
    const newSurname = 'NewSurname';
    updateProfileDetail.mockResolvedValue({ success: true });

    const result = await AccountService.updateSurname(newSurname, user);

    expect(updateProfileDetail).toHaveBeenCalledWith({
      ...user,
      surname: newSurname,
    });
    expect(result).toEqual({ success: true });
  });

  test('should catch and log error in updateSurname', async () => {
    const error = new Error('API Error');
    updateProfileDetail.mockRejectedValue(error);

    await expect(AccountService.updateSurname('NewSurname', user)).rejects.toThrow('API Error');
    expect(console.error).toHaveBeenCalledWith(
      'An error occured during AccountService.updateSurname : ',
      error
    );
  });

  test('should update email successfully', async () => {
    const newEmail = 'new@example.com';
    updateProfileDetail.mockResolvedValue({ success: true });

    const result = await AccountService.updateEmail(newEmail, user);

    expect(updateProfileDetail).toHaveBeenCalledWith({
      ...user,
      email: newEmail,
    });
    expect(result).toEqual({ success: true });
  });

  test('should catch and log error in updateEmail', async () => {
    const error = new Error('API Error');
    updateProfileDetail.mockRejectedValue(error);

    await expect(AccountService.updateEmail('new@example.com', user)).rejects.toThrow('API Error');
    expect(console.error).toHaveBeenCalledWith(
      'An error occured during AccountService.updateEmail : ',
      error
    );
  });

  test('should update phone number successfully', async () => {
    const newPhone = '0987654321';
    updateProfileDetail.mockResolvedValue({ success: true });

    const result = await AccountService.updatePhone(newPhone, user);

    expect(updateProfileDetail).toHaveBeenCalledWith({
      ...user,
      phoneNumber: newPhone,
    });
    expect(result).toEqual({ success: true });
  });

  test('should catch and log error in updatePhone', async () => {
    const error = new Error('API Error');
    updateProfileDetail.mockRejectedValue(error);

    await expect(AccountService.updatePhone('0987654321', user)).rejects.toThrow('API Error');
    expect(console.error).toHaveBeenCalledWith(
      'An error occured during AccountService.updatePhone : ',
      error
    );
  });

  test('should change password successfully', async () => {
    const currentPassword = 'oldPassword';
    const newPassword = 'newPassword';
    changePassword.mockResolvedValue({ success: true });

    const result = await AccountService.changePassword(currentPassword, newPassword);

    expect(changePassword).toHaveBeenCalledWith({ currentPassword, newPassword });
    expect(result).toEqual({ success: true });
  });

  test('should catch and log error in changePassword', async () => {
    const error = new Error('API Error');
    changePassword.mockRejectedValue(error);

    await expect(AccountService.changePassword('oldPassword', 'newPassword')).rejects.toThrow('API Error');
    expect(console.error).toHaveBeenCalledWith(
      'An error occured during AccountService.changePassword : ',
      error
    );
  });

  test('should disable profile successfully', async () => {
    disableProfile.mockResolvedValue({ success: true });

    const result = await AccountService.disableProfile();

    expect(disableProfile).toHaveBeenCalled();
    expect(result).toEqual({ success: true });
  });

  test('should catch and log error in disableProfile', async () => {
    const error = new Error('API Error');
    disableProfile.mockRejectedValue(error);

    await expect(AccountService.disableProfile()).rejects.toThrow('API Error');
    expect(console.error).toHaveBeenCalledWith(
      'An error occured during AccountService.disableProfile : ',
      error
    );
  });

  test('should delete profile successfully', async () => {
    deleteProfile.mockResolvedValue({ success: true });

    const result = await AccountService.deleteProfile();

    expect(deleteProfile).toHaveBeenCalled();
    expect(result).toEqual({ success: true });
  });

  test('should catch and log error in deleteProfile', async () => {
    const error = new Error('API Error');
    deleteProfile.mockRejectedValue(error);

    await expect(AccountService.deleteProfile()).rejects.toThrow('API Error');
    expect(console.error).toHaveBeenCalledWith(
      'An error occured during AccountService.deleteProfile : ',
      error
    );
  });

  test('should send email verification code successfully', async () => {
    sendEmailVerificationCode.mockResolvedValue({ success: true });

    const result = await AccountService.sendEmailVerificationCode();

    expect(sendEmailVerificationCode).toHaveBeenCalled();
    expect(result).toEqual({ success: true });
  });

  test('should catch and log error in sendEmailVerificationCode', async () => {
    const error = new Error('API Error');
    sendEmailVerificationCode.mockRejectedValue(error);

    await expect(AccountService.sendEmailVerificationCode()).rejects.toThrow('API Error');
    expect(console.error).toHaveBeenCalledWith(
      'An error occured during AccountService.sendEmailVerificationCode : ',
      error
    );
  });

  test('should handle errors in updateUsername', async () => {
    updateProfileDetail.mockRejectedValue(new Error('API Error'));

    await expect(AccountService.updateUsername('newUsername', user)).rejects.toThrow('API Error');
    expect(updateProfileDetail).toHaveBeenCalled();
  });
});
