import { PermissionsAndroid, Platform, Linking } from 'react-native';

export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return true;

  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Location Permission',
      message: 'We need your location to show nearby places.',
      buttonPositive: 'Allow',
      buttonNegative: 'Deny',
    }
  );

  if (result === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    Linking.openSettings();
  }

  return false;
};
