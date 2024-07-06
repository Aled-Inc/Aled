import {useFormik} from 'formik';
import i18n from 'i18n-js';
import {Box, Button, Center, FormControl, Input, Stack, WarningOutlineIcon} from 'native-base';
import PropTypes from 'prop-types';
import React, {useRef, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {object, string} from 'yup';
import {login} from '../../api/AccountAPI';
import ValidationMessage from '../../components/ValidationMessage/ValidationMessage';
import AppActions from '../../store/actions/AppActions';
import LoadingActions from '../../store/actions/LoadingActions';
import PersistentStorageActions from '../../store/actions/PersistentStorageActions';
import {connectToRedux} from '../../utils/ReduxConnect';

const ValidationSchema = object().shape({
    username: string().required('AbpAccount::ThisFieldIsRequired.'),
    password: string().required('AbpAccount::ThisFieldIsRequired.'),
});

function LoginScreen({navigation, startLoading, stopLoading, setToken, fetchAppConfig}) {
    const passwordRef = useRef(null);

    const submit = ({username, password}) => {
        startLoading({key: 'login'});
        login({username, password})
            .then((data) =>
                setToken({
                    ...data,
                    expire_time: new Date().valueOf() + data.expires_in,
                    scope: undefined,
                })
            )
            .then(
                () =>
                    new Promise((resolve) =>
                        fetchAppConfig({
                            showLoading: false,
                            callback: () => resolve(true),
                        })
                    )
            )
            .finally(() => stopLoading({key: 'login'}));
    };

    const formik = useFormik({
        validationSchema: ValidationSchema,
        initialValues: {username: '', password: ''},
        onSubmit: submit,
    });

    return (
        <Center flex={0.6} px="3">
            <Box style={styles.titleBox}>
                <Text style={styles.appTitle}>Aled.</Text>
            </Box>
            <Box style={styles.formBox}>
                <View style={{marginBottom: 20, alignItems: 'center'}}>
                  <Text style={styles.title}>Log In</Text>
                  <Text style={styles.subtitle}>Login to open your fridge</Text>
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
                            placeholder='email'
                            style={styles.input}
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
                            placeholder='password'
                            style={styles.input}
                            variant={'rounded'}
                            borderWidth={'0'}
                        />
                        <Text style={styles.forgotPassword}>I forgot my password</Text>
                        <FormControl.ErrorMessage
                            leftIcon={<WarningOutlineIcon size="xs"/>}
                        >
                            {formik.errors.password}
                        </FormControl.ErrorMessage>
                    </Stack>
                </FormControl>

                <View style={{marginTop: 20, alignItems: 'center'}}>
                    <Button onPress={formik.handleSubmit} width="40%" size="lg" style={styles.button}>
                        {/* {i18n.t('AbpAccount::Login')} */}
                        <Text style={styles.button.text}>Login</Text>
                    </Button>
                    <Text style={styles.dontHaveAccount}>Maybe you don't have any account ?</Text>
                    <Text onPress={() => navigation.navigate('Register')} style={styles.registerHere}>Register here</Text>
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

const styles = StyleSheet.create({
  titleBox: {
    width: '100%',
    marginTop: '55%',
    alignItems: 'center'
  },
  formBox: {
    width: '100%',
    marginTop: '35%',
  },
  button: {
    backgroundColor: '#FFC700',
    borderRadius: 25,
    height: 45,
    marginTop: 100,
    marginBottom: 15,
    text: {
      fontFamily: 'Inter-Light',
      fontSize: 14,
      color: '#000'
    }
  },
  input: {
    height: 40,
    paddingHorizontal: 15,
    fontSize: 14,
    backgroundColor: '#ffffff',
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 40
  },
  subtitle: {
    fontFamily: 'Inter-Light',
    fontSize: 15,
    color: '#808080',
    marginTop: 5,
    marginBottom: 20
  },
  appTitle: {
    fontFamily: 'Inter-Light',
    fontSize: 16,
    color: '#808080'
  },
  forgotPassword: {
    fontFamily: 'Inter-Light',
    fontSize: 12,
    paddingTop: 5,
    paddingLeft: 10
  },
  dontHaveAccount: {
    fontFamily: 'Inter-Light',
    fontSize: 14,
  },
  registerHere: {
    fontFamily: 'Inter-Light',
    fontSize: 14,
    color: '#808080',
    textDecorationLine: 'underline'
  }
});

export default connectToRedux({
    component: LoginScreen,
    dispatchProps: {
        startLoading: LoadingActions.start,
        stopLoading: LoadingActions.stop,
        fetchAppConfig: AppActions.fetchAppConfigAsync,
        setToken: PersistentStorageActions.setToken,
    },
});
