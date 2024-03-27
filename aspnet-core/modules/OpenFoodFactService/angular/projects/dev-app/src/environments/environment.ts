import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl: 'http://localhost:4200/',
    name: 'OpenFoodFactService',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44348/',
    redirectUri: baseUrl,
    clientId: 'OpenFoodFactService_App',
    responseType: 'code',
    scope: 'offline_access OpenFoodFactService',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://localhost:44348',
      rootNamespace: 'OpenFoodFactService',
    },
    OpenFoodFactService: {
      url: 'https://localhost:44309',
      rootNamespace: 'OpenFoodFactService',
    },
  },
} as Environment;
