const ENV = {
    dev: {
        apiUrl: 'https://192.0.0.2:44300',
        oAuthConfig: {
            issuer: 'https://192.0.0.2:44301',
            clientId: 'Aled_App',
            scope: 'offline_access Aled',
        },
        localization: {
            defaultResourceName: 'Aled',
        },
    },
    prod: {
        apiUrl: 'https://192.0.0.2:44300',
        oAuthConfig: {
            issuer: 'https://192.0.0.2:44301',
            clientId: 'Aled_App',
            scope: 'offline_access Aled',
        },
        localization: {
            defaultResourceName: 'Aled',
        },
    },
};

export const getEnvVars = () => {
    // eslint-disable-next-line no-undef
    return __DEV__ ? ENV.dev : ENV.prod;
};
