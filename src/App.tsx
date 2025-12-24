import React, { useEffect, useState } from 'react';
import { StatusBar, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Screens
import OnboardingScreen from './screens/onboarding';
import SignUpScreen from './screens/auth/signup';
import SignInScreen from './screens/auth/signin';
import ForgetScreen from './screens/auth/forget';
import OTPScreen from './screens/auth/otp';
import ResetScreen from './screens/auth/reset';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#2853AF" />
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F3F7" />
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
