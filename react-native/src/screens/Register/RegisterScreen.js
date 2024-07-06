import { useFormik } from 'formik';
import i18n from 'i18n-js';
import {
  Box,
  Button,
  Center,
  FormControl,
  Image,
  Input,
  Stack,
  WarningOutlineIcon,
} from 'native-base';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { View } from 'react-native';
import { object, string } from 'yup';
import ValidationMessage from '../../components/ValidationMessage/ValidationMessage';
import AppActions from '../../store/actions/AppActions';
import LoadingActions from '../../store/actions/LoadingActions';
import { connectToRedux } from '../../utils/ReduxConnect';
import { register } from '../../api/AccountAPI';

const ValidationSchema = object().shape({
  username: string().required('AbpAccount::ThisFieldIsRequired.'),
  email: string().required('AbpAccount::ThisFieldIsRequired.'),
  password: string().required('AbpAccount::ThisFieldIsRequired.'),
});

function RegisterScreen({ startLoading, stopLoading, fetchAppConfig }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const submit = ({username, email, password}) => {
    startLoading({ key: 'register' });
    register({username, email, password})
      .then(
        () =>
          new Promise(resolve =>
            fetchAppConfig({
              showLoading: false,
              callback: () => resolve(true),
            }),
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
      <Box
        w={{
          base: '100%',
        }}
        mb="50"
        alignItems="center">
        <Image alt="Image" source={require('../../../assets/logo.png')} />
      </Box>
      <Box
        w={{
          base: '100%',
        }}>
        <FormControl isRequired my="2">
          <Stack mx="4">
            <FormControl.Label>
              {i18n.t('AbpAccount::UserName')}
            </FormControl.Label>
            <Input
              onChangeText={formik.handleChange('username')}
              onBlur={formik.handleBlur('username')}
              value={formik.values.username}
              returnKeyType="next"
              autoCapitalize="none"
              onSubmitEditing={() => emailRef?.current?.focus()}
              size="lg"
            />
            <ValidationMessage>{formik.errors.username}</ValidationMessage>
          </Stack>
        </FormControl>

        <FormControl isRequired my="2">
          <Stack mx="4">
            <FormControl.Label>{i18n.t('AbpAccount::EmailAddress')}</FormControl.Label>
            <Input
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              value={formik.values.email}
              ref={emailRef}
              returnKeyType="next"
              autoCapitalize="none"
              onSubmitEditing={() => passwordRef?.current?.focus()}
              size="lg"
            />
            <ValidationMessage>{formik.errors.email}</ValidationMessage>
          </Stack>
        </FormControl>

        <FormControl isRequired my="2">
          <Stack mx="4">
            <FormControl.Label>
              {i18n.t('AbpAccount::Password')}
            </FormControl.Label>
            <Input
              type="password"
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              value={formik.values.password}
              ref={passwordRef}
              autoCapitalize="none"
              size="lg"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {formik.errors.password}
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>

        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Button onPress={formik.handleSubmit} width="30%" size="lg">
            {i18n.t('AbpAccount::Register')}
          </Button>
        </View>
      </Box>
    </Center>
  );
}

RegisterScreen.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
  fetchAppConfig: PropTypes.func.isRequired,
};

export default connectToRedux({
  component: RegisterScreen,
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
    fetchAppConfig: AppActions.fetchAppConfigAsync,
  },
});
