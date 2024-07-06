const ENV = {
    dev: {
        apiUrl: 'http://192.168.1.35:44300',
        oAuthConfig: {
            issuer: 'http://192.168.1.35:44301',
            clientId: 'Aled_App',
            scope: 'offline_access Aled',
        },
        localization: {
            defaultResourceName: 'Aled',
        },
    },
    prod: {
        apiUrl: 'http://192.168.1.35:44300',
        oAuthConfig: {
            issuer: 'http://192.168.1.35:44301',
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
