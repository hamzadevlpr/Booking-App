import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaProvider
} from 'react-native-safe-area-context';
import HomeScreen from './screens/home';
import OnboardingScreen from './screens/onboarding';
import SignUpScreen from './screens/signup';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Home: undefined;
  SignUp: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {

  return (
    <SafeAreaProvider>
      <NavigationContainer key={Math.random().toString()}>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


export default App;

