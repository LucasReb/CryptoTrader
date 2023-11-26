// react-navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Icons
import { Feather } from "@expo/vector-icons";

// Screens
import { Home } from "../screens/Home";
import { Profile } from "../screens/Profile";
import { Actions } from "../screens/Actions";

const { Navigator, Screen } = createBottomTabNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
        }}
        initialRouteName="Register"
      >
        <Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Feather name="home" size={size} color={color} />
            ),
          }}
        />
        <Screen
          name="Actions"
          component={Actions}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Feather name="credit-card" size={size} color={color} />
            ),
          }}
        />
        <Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Feather name="user" size={size} color={color} />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
