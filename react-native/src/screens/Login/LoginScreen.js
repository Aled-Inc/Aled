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
import { connectToRedux } from '../../utils/ReduxConnect';
import { authStyles } from '../../styles/AuthStyle';
import AuthActions from '../../store/actions/AuthActions';

const ValidationSchema = object().shape({
  username: string().required('AbpAccount::ThisFieldIsRequired.'),
  password: string().required('AbpAccount::ThisFieldIsRequired.'),
});

function LoginScreen({ navigation, login }) {
  const passwordRef = useRef(null);

  const submit = ({ username, password }) => {
    login({username, password});
  };

  const formik = useFormik({
    validationSchema: ValidationSchema,
    initialValues: { username: '', password: '' },
    onSubmit: submit,
  });

  return (
    <Center flex={0.6} px="3">
      <Box style={authStyles.titleBox}>
        <Text style={authStyles.appTitle}>{i18n.t('Aled::Aled')}</Text>
      </Box>
      <Box style={authStyles.formBox}>
        <View style={{ marginBottom: 20, alignItems: 'center' }}>
          <Text style={authStyles.title}>{i18n.t('Aled::Login:Title')}</Text>
          <Text style={authStyles.subtitle}>{i18n.t('Aled::Login:SubPhrase')}</Text>
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
              placeholder={i18n.t('Aled::Email').toLowerCase()}
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
              placeholder={i18n.t('Aled::Password').toLowerCase()}
              style={authStyles.input}
              variant={'rounded'}
              borderWidth={'0'}
            />
            <Text style={authStyles.forgotPassword}>{i18n.t('Aled::Login:ForgotMyPassword')}</Text>
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
            <Text style={authStyles.button.text}>{i18n.t('Aled::Login:Login')}</Text>
          </Button>
          <Text style={authStyles.authPhrase}>
            {i18n.t('Aled::Login:NoAccount')}
          </Text>
          <Text
            onPress={() => navigation.navigate('Register')}
            style={authStyles.authLink}>
            {i18n.t('Aled::Login:RegisterHere')}
          </Text>
        </View>
      </Box>
    </Center>
  );
}

LoginScreen.propTypes = {
  login: PropTypes.func.isRequired
};

export default connectToRedux({
  component: LoginScreen,
  dispatchProps: {
    login: AuthActions.loginAsync
  },
});
