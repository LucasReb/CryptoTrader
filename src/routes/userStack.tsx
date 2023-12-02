// react-navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Icons
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// Screens
import { Home } from "../screens/Home";
import { Profile } from "../screens/Profile";
import { Actions } from "../screens/Actions";

// Others imports
import { useRef } from "react";
import { Animated, View } from "react-native";

const { Navigator, Screen } = createBottomTabNavigator();

export default function UserStack() {
  // Animação de indicador
  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "#282828",
            borderTopWidth: 0,
            height: 62,
          },
        }}
        initialRouteName="Home"
      >
        <Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Entypo name="home" size={22} color={color} />
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Screen
          name="Actions"
          component={Actions}
          options={{
            tabBarIcon: ({ size, color }) => (
              // <Feather name="credit-card" size={24} color={color} />
              <AntDesign name="areachart" size={24} color={color} />
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: 130,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="settings" size={23} color={color} />
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: 262,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Navigator>
      <Animated.View
        style={{
          width: 32,
          height: 2,
          borderRadius: 100,
          backgroundColor: "#ffcc00",
          position: "absolute",
          bottom: 11,
          left: 50,
          transform: [{ translateX: tabOffsetValue }],
        }}
      ></Animated.View>
    </NavigationContainer>
  );
}
