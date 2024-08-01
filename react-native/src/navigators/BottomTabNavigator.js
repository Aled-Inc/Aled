import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from '../screens/Home/HomeScreen';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from "../styles/CommonStyle";

const Tab = createBottomTabNavigator();

function isTabActive(isFocused) {
  return isFocused ? Colors.Element : Colors.Text;
}

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            flex: 0.08,
            backgroundColor: Colors.NavBG
          }
        }}
      >
      <Tab.Screen name="Scan" component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="barcode-scan" size={30} color={isTabActive(focused)} />
          }}/>
      <Tab.Screen name="Chat" component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="chat-outline" size={30} color={isTabActive(focused)} />
          }}/>
      <Tab.Screen name="Home" component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => <AntDesign name="home" size={30} color={isTabActive(focused)} />
          }}/>
      <Tab.Screen name="Fridge" component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="fridge-variant-outline" size={30} color={isTabActive(focused)} />
          }}/>
      <Tab.Screen name="Profile" component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="account-circle-outline" size={30} color={isTabActive(focused)} />
          }}/>
    </Tab.Navigator>
  )
}