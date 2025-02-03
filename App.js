import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './components/Splashscreen';
import LoginScreen from './components/LoginScreen';
import HomePage from './components/HomePage';
import ProfilePage from './components/Profile';
import UpNextPage from './components/UpNext';
import SchedulePage from './components/Schedule';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainApp" component={HomePage} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="UpNext" component={UpNextPage} />
        <Stack.Screen name="Schedule" component={SchedulePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
