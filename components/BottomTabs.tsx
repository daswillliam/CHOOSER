import * as React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import WheelScreen from "./screens/WheelScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import FriendDetailScreen from "./screens/FriendDetailScreen";

type ProfileStackParamList = {
  ProfileHome: undefined;
  FriendDetail: { id: string };
};

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator id="ProfileStack">
      <ProfileStack.Screen name="ProfileHome" component={ProfileScreen} options={{ title: "Profil" }} />
      <ProfileStack.Screen name="FriendDetail" component={FriendDetailScreen} options={{ title: "Freunde" }} />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const isDarkMode = false; // später aus Settings state

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        id="BottomTabs"
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: isDarkMode ? "#636366" : "#8E8E93",
          tabBarStyle: {
            height: 88,
            paddingTop: 8,
            paddingBottom: 24,
          },
          tabBarIcon: ({ color, size }) => {
            const map: Record<string, keyof typeof Ionicons.glyphMap> = {
              Wheel: "sync",
              Settings: "settings",
              Profile: "person",
            };
            return <Ionicons name={map[route.name] ?? "ellipse"} size={size ?? 24} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Glücksrad" component={WheelScreen} />
        <Tab.Screen name="Einstellungen" component={SettingsScreen} />
        <Tab.Screen name="Profil" component={ProfileStackNavigator} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
