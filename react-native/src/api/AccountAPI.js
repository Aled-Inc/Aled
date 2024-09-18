import api from './API';
import {getEnvVars} from '../../Environment';

const {oAuthConfig} = getEnvVars();

const getLoginData = (username, password) => {
    const formData = {
        grant_type: 'password',
        scope: oAuthConfig.scope,
        username: username,
        password: password,
        client_id: oAuthConfig.clientId,
    };

    if (oAuthConfig.clientSecret)
        formData['client_secret'] = oAuthConfig.clientSecret;

    return Object.entries(formData)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
};

export const login = ({username, password}) =>
    api({
        method: 'POST',
        url: '/connect/token',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: getLoginData(username, password),
        baseURL: oAuthConfig.issuer,
    }).then(({data}) => data);

export const register = async ({username, email, password}) => {
  let body = JSON.stringify({
    userName: username,
    emailAddress: email,
    password,
    appName: 'Aled'
  });

  const { data } = await api.post('/api/account/register', body);
  return data;
}

export const Logout = async (
    input = {client_id: '', token: '', token_type_hint: ''},
) => {
    if (!input.token_type_hint) {
        input.token_type_hint = 'access_token';
    }

    const _data = Object.entries(input)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');

    const { data } = await api({
    method: 'POST',
    url: '/connect/revocat',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: _data,
    baseURL: oAuthConfig.issuer,
  });
  return data;
};