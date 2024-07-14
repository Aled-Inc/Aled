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
import ValidationMessage from '../../components/ValidationMessage/ValidationMessage';
import AppActions from '../../store/actions/AppActions';
import LoadingActions from '../../store/actions/LoadingActions';
import { connectToRedux } from '../../utils/ReduxConnect';
import { login, register } from '../../api/AccountAPI';
import PersistentStorageActions from '../../store/actions/PersistentStorageActions';
import { authStyles } from '../../styles/authStyles';

const ValidationSchema = object().shape({
  username: string().required('AbpAccount::ThisFieldIsRequired.'),
  email: string().required('AbpAccount::ThisFieldIsRequired.'),
  password: string().required('AbpAccount::ThisFieldIsRequired.'),
});

function RegisterScreen({
  startLoading,
  stopLoading,
  setToken,
  fetchAppConfig,
}) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const submit = ({ username, email, password }) => {
    startLoading({ key: 'register' });
    register({ username, email, password })
      .then(() =>
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
          ),
      )
      .finally(() => stopLoading({ key: 'register' }));
  };

  const formik = useFormik({
    validationSchema: ValidationSchema,
    initialValues: { username: '', email: '', password: '' },
    onSubmit: submit,
  });

  return (
    <Center flex={0.6} px="3">
      <Box style={authStyles.titleBox}>
        <Text style={authStyles.appTitle}>Aled.</Text>
      </Box>
      <Box style={authStyles.formBox}>
        <View style={{ marginBottom: 20, alignItems: 'center' }}>
          <Text style={authStyles.title}>Register</Text>
          <Text style={authStyles.subtitle}>
            Register to create your virtual fridge
          </Text>
        </View>
        <FormControl isRequired my="2">
          <Stack mx="12">
            <Input
              onChangeText={formik.handleChange('username')}
              onBlur={formik.handleBlur('username')}
              value={formik.values.username}
              returnKeyType="next"
              autoCapitalize="none"
              onSubmitEditing={() => emailRef?.current?.focus()}
              size="lg"
              placeholder="username"
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
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              value={formik.values.email}
              ref={emailRef}
              returnKeyType="next"
              autoCapitalize="none"
              onSubmitEditing={() => passwordRef?.current?.focus()}
              size="lg"
              placeholder="email"
              style={authStyles.input}
              variant={'rounded'}
              borderWidth={'0'}
            />
            <ValidationMessage>{formik.errors.email}</ValidationMessage>
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
            <Text style={authStyles.button.text}>Register</Text>
          </Button>
          <Text style={authStyles.authPhrase}>
            Maybe you already have an account ?
          </Text>
          <Text
            style={authStyles.authLink}>
            Login here
          </Text>
        </View>
      </Box>
    </Center>
  );
}

RegisterScreen.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  fetchAppConfig: PropTypes.func.isRequired,
};

export default connectToRedux({
  component: RegisterScreen,
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
    setToken: PersistentStorageActions.setToken,
    fetchAppConfig: AppActions.fetchAppConfigAsync,
  },
});
