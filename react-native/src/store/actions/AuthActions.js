import { createAction } from "@reduxjs/toolkit";

const loginAsync = createAction('auth/login',
  ({ username = '', password = '', showLoading = true } = {}) => ({
    payload: { username, password, showLoading }
  }),
);

const registerAsync = createAction('auth/register',
  ({ username = '', email = '', password = '', showLoading = true} = {}) => ({
    payload: { username, email, password, showLoading }
}),
);

const setUser = createAction('auth/setUser');

const reloadCurrentUserInfoAsync = createAction('auth/reload-user');

export default {
  loginAsync,
  registerAsync,
  setUser,
  reloadCurrentUserInfoAsync,
};