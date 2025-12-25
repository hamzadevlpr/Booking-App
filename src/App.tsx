import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Screens
import ForgetScreen from './screens/auth/forget';
import OTPScreen from './screens/auth/otp';
import ResetScreen from './screens/auth/reset';
import SignInScreen from './screens/auth/signin';
import SignUpScreen from './screens/auth/signup';
import OnboardingScreen from './screens/onboarding';

// Bottom Tabs
import BottomTabNavigator from './navigation/BottomTabNavigator';

export type RootStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Forget: undefined;
  Reset: undefined;
  OTP: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff" 
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Onboarding / Auth Flow */}
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Forget" component={ForgetScreen} />
          <Stack.Screen name="Reset" component={ResetScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />

          {/* Main App */}
          <Stack.Screen name="Main" component={BottomTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
