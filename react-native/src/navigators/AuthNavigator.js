import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {LocalizationContext} from '../contexts/LocalizationContext';
import LoginScreen from '../screens/Login/LoginScreen';
import RegisterScreen from '../screens/Register/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    const {t} = useContext(LocalizationContext);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={() => ({
                    title: t('AbpAccount::Login'),
                })}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={() => ({
                    title: t('AbpAccount::Register'),
                })}
            />
        </Stack.Navigator>
    );
}
