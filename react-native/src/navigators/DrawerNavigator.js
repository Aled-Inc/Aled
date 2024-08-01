import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from '../components/DrawerContent/DrawerContent';
import {LocalizationContext} from '../contexts/LocalizationContext';
import HomeStackNavigator from './HomeNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    const {t} = React.useContext(LocalizationContext);

    return (
        <Drawer.Navigator 
            initialRouteName="Home"
            drawerContent={DrawerContent}
            screenOptions={{
              headerShown: false,
              contentStyle: {
                  backgroundColor: '#F1EEF1',
              },
          }}>
            <Drawer.Screen
                name="HomeStack"
                component={HomeStackNavigator}
            />
        </Drawer.Navigator>
    );
}
