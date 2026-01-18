import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Screens
import ForgetScreen from './screens/auth/forget';
import OTPScreen from './screens/auth/otp';
import ResetScreen from './screens/auth/reset';
import SignInScreen from './screens/auth/signin';
import SignUpScreen from './screens/auth/signup';
import OnboardingScreen from './screens/onboarding';

// Bottom Tabs
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import BookingDetailScreen from './screens/BookingDetailScreen';
import MapExploreScreen from './screens/MapExploreScreen';
import PersonalInfoScreen from './screens/PersonalInfoScreen';
import ReviewScreen from './screens/ReviewScreen';
import FacilitiesAccordionScreen from './screens/FacilitiesAccordionScreen';
import RequestToBookScreen from './screens/RequestToBookScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Forget: undefined;
  Reset: undefined;
  OTP: undefined;
  Main: undefined;
  MapExplore: undefined;
  BookingDetail: undefined;
  Personal: undefined;
  ReviewScreen: undefined;
  FacilitiesAccordionScreen: undefined;
  RequestToBookScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? '#000000' : '#FFFFFF'}
        />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            statusBarStyle: 'dark',
            statusBarBackgroundColor: '#FFFFFF',
          }}>
            {/* Onboarding / Auth Flow */}
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Forget" component={ForgetScreen} />
            <Stack.Screen name="Reset" component={ResetScreen} />
            <Stack.Screen name="OTP" component={OTPScreen} />

            {/* Main App */}
            <Stack.Screen name="Main" component={BottomTabNavigator} />
            <Stack.Screen name="MapExplore" component={MapExploreScreen} />
            <Stack.Screen name="BookingDetail" component={BookingDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name="Personal"
              component={PersonalInfoScreen}
            />
            <Stack.Screen
              name="ReviewScreen"
              component={ReviewScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FacilitiesAccordionScreen"
              component={FacilitiesAccordionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RequestToBookScreen"
              component={RequestToBookScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
