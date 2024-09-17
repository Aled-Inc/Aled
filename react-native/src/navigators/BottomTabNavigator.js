import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../styles/CommonStyle';
import { Entypo } from '@expo/vector-icons';
import ProfileStackNavigator from './ProfileNavigator';
import Wrapper from '../components/Wrapper/Wrapper';
import I18n from 'i18n-js';
import EmailConfirmationScreen from '../screens/EmailConfirmation/EmailConfirmationScreen';
import ScanScreen from '../screens/Scan/ScanScreen';
import ProductDetailScreen from '../screens/ProductDetails/ProductDetailScreen';

const Tab = createBottomTabNavigator();

function isTabActive(isFocused) {
  return isFocused ? Colors.Element : Colors.Text;
}

export default function BottomTabNavigator() {
  return (
    <Wrapper>
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
          component={HomeScreen}
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
          component={HomeScreen}
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
        <Tab.Screen
          name="EmailConfirmation"
          component={EmailConfirmationScreen}
          options={{
            headerShown: false,
            tabBarButton: () => null,
            tabBarStyle: { display: 'none' },
          }}></Tab.Screen>
        <Tab.Screen
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
          })}></Tab.Screen>
      </Tab.Navigator>
    </Wrapper>
  );
}
