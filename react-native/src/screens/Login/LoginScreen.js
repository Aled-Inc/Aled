import { useFormik } from 'formik';
import i18n from 'i18n-js';
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  Stack,
  WarningOutlineIcon,
} from 'native-base';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import { object, string } from 'yup';
import { login } from '../../api/AccountAPI';
import ValidationMessage from '../../components/ValidationMessage/ValidationMessage';
import AppActions from '../../store/actions/AppActions';
import LoadingActions from '../../store/actions/LoadingActions';
import PersistentStorageActions from '../../store/actions/PersistentStorageActions';
import { connectToRedux } from '../../utils/ReduxConnect';
import { authStyles } from '../../styles/authStyles';

const ValidationSchema = object().shape({
  username: string().required('AbpAccount::ThisFieldIsRequired.'),
  password: string().required('AbpAccount::ThisFieldIsRequired.'),
});

function LoginScreen({
  navigation,
  startLoading,
  stopLoading,
  setToken,
  fetchAppConfig,
}) {
  const passwordRef = useRef(null);

  const submit = ({ username, password }) => {
    startLoading({ key: 'login' });
    login({ username, password })
      .then(data =>
        setToken({
          ...data,
          expire_time: new Date().valueOf() + data.expires_in,
          scope: undefined,
        }),
      )
      .then(
        () =>
          new Promise(resolve =>
            fetchAppConfig({
              showLoading: false,
              callback: () => resolve(true),
            }),
          ),
      )
      .finally(() => stopLoading({ key: 'login' }));
  };

  const formik = useFormik({
    validationSchema: ValidationSchema,
    initialValues: { username: '', password: '' },
    onSubmit: submit,
  });

  return (
    <Center flex={0.6} px="3">
      <Box style={authStyles.titleBox}>
        <Text style={authStyles.appTitle}>Aled.</Text>
      </Box>
      <Box style={authStyles.formBox}>
        <View style={{ marginBottom: 20, alignItems: 'center' }}>
          <Text style={authStyles.title}>Log In</Text>
          <Text style={authStyles.subtitle}>Login to open your fridge</Text>
        </View>
        <FormControl isRequired my="2">
          <Stack mx="12">
            <Input
              onChangeText={formik.handleChange('username')}
              onBlur={formik.handleBlur('username')}
              value={formik.values.username}
              returnKeyType="next"
              autoCapitalize="none"
              onSubmitEditing={() => passwordRef?.current?.focus()}
              size="lg"
              placeholder="email"
              style={authStyles.input}
              variant={'rounded'}
              borderWidth={'0'}
            />
            <ValidationMessage>{formik.errors.username}</ValidationMessage>
          </Stack>
        </FormControl>

        <FormControl isRequired my="2">
          <Stack mx="12">
            <Input
              type="password"
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              value={formik.values.password}
              ref={passwordRef}
              autoCapitalize="none"
              size="lg"
              placeholder="password"
              style={authStyles.input}
              variant={'rounded'}
              borderWidth={'0'}
            />
            <Text style={authStyles.forgotPassword}>I forgot my password</Text>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {formik.errors.password}
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>

        <View style={authStyles.buttonBox}>
          <Button
            onPress={formik.handleSubmit}
            width="40%"
            size="lg"
            style={authStyles.button}>
            <Text style={authStyles.button.text}>Login</Text>
          </Button>
          <Text style={authStyles.authPhrase}>
            Maybe you don't have any account ?
          </Text>
          <Text
            onPress={() => navigation.navigate('Register')}
            style={authStyles.authLink}>
            Register here
          </Text>
        </View>
      </Box>
    </Center>
  );
}

LoginScreen.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  fetchAppConfig: PropTypes.func.isRequired,
};

export default connectToRedux({
  component: LoginScreen,
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
    fetchAppConfig: AppActions.fetchAppConfigAsync,
    setToken: PersistentStorageActions.setToken,
  },
});
