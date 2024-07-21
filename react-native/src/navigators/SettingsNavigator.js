import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import { Entypo } from '@expo/vector-icons';
import AccountScreen from '../screens/Account/AccountScreen';
import { Colors } from '../styles/CommonStyle';
import EditPropertyScreen from '../screens/CommonScreen/EditPropertyScreen';
import Wrapper from '../components/Wrapper/Wrapper';
import I18n from 'i18n-js';

const Stack = createNativeStackNavigator();

export default function SettingsNavigator() {
  return (
    <Wrapper>
      <Stack.Navigator
        initialRouteName='Settings'
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.BG,
          },
          headerTitleStyle: {
            fontFamily: 'Inter-Light',
            fontSize: 24,
          },
        }}>
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={({ navigation }) => ({
            title: I18n.t('AbpSettingManagement::Settings'),
            headerLeft: () => (
              <Entypo
                name="chevron-thin-left"
                size={24}
                color={Colors.Text}
                onPress={() => navigation.goBack()}
              />
            ),
          })}></Stack.Screen>
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={({ navigation }) => ({
            title: I18n.t('AbpAccount::Menu:Account'),
            headerLeft: () => (
              <Entypo
                name="chevron-thin-left"
                size={24}
                color={Colors.Text}
                onPress={() => navigation.goBack()}
              />
            ),
          })}></Stack.Screen>
          <Stack.Screen 
            name='Edit' 
            component={EditPropertyScreen}
            options={({ route, navigation }) => ({
              title: route.params.title,
              headerLeft: () => (
                <Entypo
                  name="chevron-thin-left"
                  size={24}
                  color={Colors.Text}
                  onPress={() => navigation.goBack()}
                />
              ),
              })}
            >
          </Stack.Screen>
      </Stack.Navigator>
    </Wrapper>
  );
}
