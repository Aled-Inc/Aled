import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import i18n from 'i18n-js';
import { NativeBaseProvider } from 'native-base';
import React, { useEffect, useMemo, useState } from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { getEnvVars } from './Environment';
import Loading from './src/components/Loading/Loading';
import { LocalizationContext } from './src/contexts/LocalizationContext';
import { initAPIInterceptor } from './src/interceptors/APIInterceptor';
import AuthNavigator from './src/navigators/AuthNavigator';
import { persistor, store } from './src/store';
import AppActions from './src/store/actions/AppActions';
import PersistentStorageActions from './src/store/actions/PersistentStorageActions';
import { createLanguageSelector } from './src/store/selectors/AppSelectors';
import { createTokenSelector } from './src/store/selectors/PersistentStorageSelectors';
import { connectToRedux } from './src/utils/ReduxConnect';
import { isTokenValid } from './src/utils/TokenUtils';
import { createUserSelector } from './src/store/selectors/AuthSelector';
import AuthActions from './src/store/actions/AuthActions';
import { isUserValid } from './src/utils/UserUtils';
import BottomTabNavigator from './src/navigators/BottomTabNavigator';
import ActionStatusModal from './src/components/Modals/ActionStatusModal';
import * as Linking from 'expo-linking';
import BaseModal from './src/components/Modals/BaseModal';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

const { localization } = getEnvVars();

const prefix = Linking.createURL('/');

i18n.defaultSeparator = '::';

const cloneT = i18n.t;
i18n.t = (key, ...args) => {
  if (key.slice(0, 2) === '::') {
    key = localization.defaultResourceName + key;
  }
  return cloneT(key, ...args);
};

enableScreens();
initAPIInterceptor(store);

export default function App() {
  const language = createLanguageSelector()(store.getState());
  const [isReady, setIsReady] = useState(false);
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        EmailConfirmation: {
          path: 'email-confirmation/:state',
        }
      },
    },
  };

  const [loaded, error] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-ExtraBold': require('./assets/fonts/Inter-ExtraBold.ttf'),
    'Inter-ExtraLight': require('./assets/fonts/Inter-ExtraLight.ttf'),
    'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Thin': require('./assets/fonts/Inter-Thin.ttf'),
  });

  const localizationContextValue = useMemo(
    () => ({
      t: i18n.t,
      locale: (language || {}).cultureName,
    }),
    [language],
  );

  useEffect(() => {
    store.dispatch(
      AppActions.fetchAppConfigAsync({
        callback: () => setIsReady(true),
        showLoading: true,
      }),
    );
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NativeBaseProvider>
            {isReady ? (
              <LocalizationContext.Provider value={localizationContextValue}>
                <ConnectedAppContainer />
              </LocalizationContext.Provider>
            ) : null}
            <Loading />
            <BaseModal />
            <ActionStatusModal />
          </NativeBaseProvider>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}

function AppContainer({ token, setToken, user, setUser }) {
  const isValid = useMemo(() => isTokenValid(token), [token]);
  const isValidUser = useMemo(() => isUserValid(user), [user]);

  useEffect(() => {
    if ((!isValid && token && token.access_token) || (!isValidUser && user)) {
      setToken({});
      setUser(null);
    }
  }, [isValid, isValidUser]);

  return isValid && isValidUser ? <BottomTabNavigator /> : <AuthNavigator />;
}

const ConnectedAppContainer = connectToRedux({
  component: AppContainer,
  stateProps: state => ({
    token: createTokenSelector()(state),
    user: createUserSelector()(state),
  }),
  dispatchProps: {
    setToken: PersistentStorageActions.setToken,
    setUser: AuthActions.setUser,
  },
});
