
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Wheel, Settings as SettingsIcon, User } from 'lucide-react-native';

import WheelScreen from './screens/WheelScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import FriendDetailScreen from './screens/FriendDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ProfileStack({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain">
        {(props) => <ProfileScreen {...props} isDarkMode={isDarkMode} />}
      </Stack.Screen>
      <Stack.Screen name="FriendDetail">
        {(props) => <FriendDetailScreen {...props} isDarkMode={isDarkMode} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const theme = {
    dark: isDarkMode,
    colors: {
      primary: '#007AFF',
      background: isDarkMode ? '#1c1c1e' : '#f2f2f7',
      card: isDarkMode ? '#1c1c1e' : '#ffffff',
      text: isDarkMode ? '#ffffff' : '#1c1c1e',
      border: isDarkMode ? '#38383a' : '#c6c6c8',
      notification: '#ff3b30',
    },
  };

  return (
    <NavigationContainer theme={theme}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Wheel') return <Wheel size={size} color={color} />;
            if (route.name === 'Settings') return <SettingsIcon size={size} color={color} />;
            if (route.name === 'Profile') return <User size={size} color={color} />;
          },
          tabBarStyle: {
            backgroundColor: isDarkMode ? '#1c1c1e' : '#ffffff',
            borderTopColor: isDarkMode ? '#38383a' : '#c6c6c8',
            height: 88,
            paddingBottom: 30,
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: isDarkMode ? '#636366' : '#8e8e93',
        })}
      >
        <Tab.Screen name="Wheel">
          {(props) => <WheelScreen {...props} isDarkMode={isDarkMode} />}
        </Tab.Screen>
        <Tab.Screen name="Settings">
          {(props) => <SettingsScreen {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
        </Tab.Screen>
        <Tab.Screen name="Profile">
          {(props) => <ProfileStack isDarkMode={isDarkMode} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
