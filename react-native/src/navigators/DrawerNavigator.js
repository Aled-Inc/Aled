import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from '../components/DrawerContent/DrawerContent';
import {LocalizationContext} from '../contexts/LocalizationContext';
import HomeStackNavigator from './HomeNavigator';
import { Colors } from '../styles/CommonStyle';

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
                  backgroundColor: Colors.BG,
              },
          }}>
            <Drawer.Screen
                name="HomeStack"
                component={HomeStackNavigator}
            />
        </Drawer.Navigator>
    );
}
