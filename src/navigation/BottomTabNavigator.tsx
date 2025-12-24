import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Screens
import HomeScreen from '../screens/home/home';
import BookingScreen from '../screens/home/booking';
import MessageScreen from '../screens/home/message';
import ProfileScreen from '../screens/home/booking copy 2';

// SVG Icons
import HomeIcon from '../assets/icons/home.svg';
import HomeFillIcon from '../assets/icons/home-fill.svg';
import BookingIcon from '../assets/icons/document.svg';
import BookingFillIcon from '../assets/icons/document-fill.svg';
import MessageIcon from '../assets/icons/chat.svg';
import MessageFillIcon from '../assets/icons/chat-fill.svg';
import ProfileIcon from '../assets/icons/user.svg';
import ProfileFillIcon from '../assets/icons/user-fill.svg';

const PRIMARY = '#2853AF';

export type BottomTabParamList = {
  Home: undefined;
  Booking: undefined;
  Message: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

// Map tabs to SVG components
const SVG_ICONS: Record<
  keyof BottomTabParamList,
  { default: React.FC<{ width: number; height: number; fill: string }> ; filled: React.FC<{ width: number; height: number; fill: string }> }
> = {
  Home: { default: HomeIcon, filled: HomeFillIcon },
  Booking: { default: BookingIcon, filled: BookingFillIcon },
  Message: { default: MessageIcon, filled: MessageFillIcon },
  Profile: { default: ProfileIcon, filled: ProfileFillIcon },
};

const TabIcon = ({ tab, focused }: { tab: keyof BottomTabParamList; focused: boolean }) => {
  const IconComponent = focused ? SVG_ICONS[tab].filled : SVG_ICONS[tab].default;
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <IconComponent width={22} height={22} fill={focused ? PRIMARY : '#9CA3AF'} />
    </View>
  );
};

const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 64 + insets.bottom,
          paddingTop: 8,
          paddingBottom: Math.max(8, insets.bottom),
        },
        tabBarLabelStyle: { fontSize: 11, fontFamily: 'Poppins-SemiBold', marginBottom: 6 },
        tabBarIconStyle: { marginTop: 4 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon tab="Home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon tab="Booking" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon tab="Message" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon tab="Profile" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapActive: {
    backgroundColor: '#E9F0FF',
    borderWidth: 1,
    borderColor: '#D7E5FF',
  },
});
