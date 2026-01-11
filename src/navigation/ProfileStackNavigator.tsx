import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/home/prodile';

const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#fff' },
          headerTitleStyle: {
            fontFamily: 'Poppins-Bold',
            fontSize: 18,
            color: '#0F1831',
          },
          statusBarStyle: 'dark',
          statusBarBackgroundColor: '#fff',
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
