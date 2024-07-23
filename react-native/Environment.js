import { ngrokApiHostUrl, ngrokAuthServerUrl } from "./local.env";

const ENV = {
    dev: {
        apiUrl: ngrokApiHostUrl,
        oAuthConfig: {
            issuer: ngrokAuthServerUrl,
            clientId: 'Aled_App',
            scope: 'offline_access Aled',
        },
        localization: {
            defaultResourceName: 'Aled',
        },
    },
    prod: {
        apiUrl: ngrokApiHostUrl,
        oAuthConfig: {
            issuer: ngrokAuthServerUrl,
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
