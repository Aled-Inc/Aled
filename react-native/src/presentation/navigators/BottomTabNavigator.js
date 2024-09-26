import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import I18n from 'i18n-js';
import HomeScreen from '../screens/Home/HomeScreen';
import ScanScreen from '../screens/Scan/ScanScreen';
import InventoryScreen from '../screens/Inventory/InventoryScreen';
import ProfileStackNavigator from './ProfileNavigator';
import ProductDetailScreen from '../screens/ProductDetails/ProductDetailScreen';
import EmailConfirmationScreen from '../screens/EmailConfirmation/EmailConfirmationScreen';
import Wrapper from '../components/Wrapper/Wrapper';
import { Colors } from '../styles/CommonStyle';
import ComingSoon from '../screens/ComingSoon/ComingSoon';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function isTabActive(isFocused) {
  return isFocused ? Colors.Element : Colors.Text;
}

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          flex: 0.08,
          backgroundColor: Colors.NavBG,
        },
        headerStyle: {
          borderBottomWidth: 0,
          backgroundColor: Colors.BG,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTitleStyle: {
          fontFamily: 'Inter-Light',
          fontSize: 24,
        },
      }}>
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          title: I18n.t('Aled::Menu:Scan'),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="barcode-scan"
              size={30}
              color={isTabActive(focused)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ComingSoon}
        options={{
          title: I18n.t('Aled::Menu:Chat'),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="chat-outline"
              size={30}
              color={isTabActive(focused)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign name="home" size={30} color={isTabActive(focused)} />
          ),
          title: '',
        }}
      />
      <Tab.Screen
        name="Fridge"
        component={InventoryScreen}
        options={{
          title: I18n.t('Aled::Menu:Fridge'),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="fridge-variant-outline"
              size={30}
              color={isTabActive(focused)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileNav"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={30}
              color={isTabActive(focused)}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Wrapper>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailScreen}
          options={({ navigation }) => ({
            tabBarButton: () => null,
            tabBarStyle: { display: 'none' },
            title: I18n.t('Aled::Product:Details'),
            headerLeft: () => (
              <Entypo
                name="chevron-thin-left"
                size={24}
                color={Colors.Text}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name="EmailConfirmation"
          component={EmailConfirmationScreen}
          options={{
            headerShown: false,
            tabBarButton: () => null,
            tabBarStyle: { display: 'none' },
          }}
        />
      </Stack.Navigator>
    </Wrapper>
  );
}
