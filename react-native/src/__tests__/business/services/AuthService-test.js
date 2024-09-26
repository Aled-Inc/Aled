import AuthService from '../../../business/services/AuthService';
import { login, Logout, register } from '../../../api/AccountAPI';
import { getCurrentUser } from '../../../api/IdentityAPI';

jest.mock('../../../api/AccountAPI', () => ({
  login: jest.fn(),
  Logout: jest.fn(),
  register: jest.fn(),
}));

jest.mock('../../../api/IdentityAPI', () => ({
  getCurrentUser: jest.fn(),
}));

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
  });

  test('should login successfully', async () => {
    const username = 'testUser';
    const password = 'testPassword';
    login.mockResolvedValue({ success: true });

    const result = await AuthService.login(username, password);

    expect(login).toHaveBeenCalledWith({ username, password });
    expect(result).toEqual({ success: true });
  });

  test('should catch and log error in login', async () => {
    const username = 'testUser';
    const password = 'testPassword';
    const error = new Error('API Error');
    login.mockRejectedValue(error);

    const result = await AuthService.login(username, password);

    expect(login).toHaveBeenCalledWith({ username, password });
    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      'An error occured during AuthService.login : ',
      error
    );
  });

  test('should register successfully', async () => {
    const username = 'newUser';
    const email = 'new@example.com';
    const password = 'newPassword';
    register.mockResolvedValue({ success: true });

    const result = await AuthService.register(username, email, password);

    expect(register).toHaveBeenCalledWith({ username, email, password });
    expect(result).toEqual({ success: true });
  });

  test('should catch and log error in register', async () => {
    const username = 'newUser';
    const email = 'new@example.com';
    const password = 'newPassword';
    const error = new Error('API Error');
    register.mockRejectedValue(error);

    const result = await AuthService.register(username, email, password);

    expect(register).toHaveBeenCalledWith({ username, email, password });
    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      'An error occured during AuthService.register : ',
      error
    );
  });

  test('should get current user successfully', async () => {
    const user = { id: 1, username: 'testUser' };
    getCurrentUser.mockResolvedValue(user);

    const result = await AuthService.getCurrentUser();

    expect(getCurrentUser).toHaveBeenCalled();
    expect(result).toEqual(user);
  });

  test('should catch and log error in getCurrentUser', async () => {
    const error = new Error('API Error');
    getCurrentUser.mockRejectedValue(error);

    const result = await AuthService.getCurrentUser();

    expect(getCurrentUser).toHaveBeenCalled();
    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      'An error occured during AuthService.getCurrentUser : ',
      error
    );
  });

  test('should logout successfully', async () => {
    const input = { client_id: '123', token: 'abc', token_type_hint: 'access_token' };
    Logout.mockResolvedValue({ success: true });

    const result = await AuthService.logout(input);

    expect(Logout).toHaveBeenCalledWith(input);
    expect(result).toEqual({ success: true });
  });

  test('should catch and log error in logout', async () => {
    const input = { client_id: '123', token: 'abc', token_type_hint: 'access_token' };
    const error = new Error('API Error');
    Logout.mockRejectedValue(error);

    const result = await AuthService.logout(input);

    expect(Logout).toHaveBeenCalledWith(input);
    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      'An error occured during AuthService.logout : ',
      error
    );
  });
});
