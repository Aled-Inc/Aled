import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../styles/CommonStyle';
import SettingsNavigator from './SettingsNavigator';
import Wrapper from '../components/Wrapper/Wrapper';
import I18n from 'i18n-js';

const Stack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <Wrapper>
      <Stack.Navigator 
        initialRouteName="Profile"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.BG,
          },
          headerTitleStyle: {
            fontFamily: 'Inter-Light',
            fontSize: 24,
          }
        }}
        >
        <Stack.Screen 
          name="Profile"
          component={ProfileScreen}
          options={({ navigation }) => ({
            title: I18n.t('Aled::Menu:Profile'),
            headerRight: () => (
              <Feather name="more-vertical" size={24} color={Colors.Text} onPress={() => navigation.navigate('SettingsNav')}/>
            )
          })}></Stack.Screen>
        <Stack.Screen
          name="SettingsNav"
          component={SettingsNavigator}
          options={{headerShown: false}}
          ></Stack.Screen>
      </Stack.Navigator>
    </Wrapper>
  );
}
