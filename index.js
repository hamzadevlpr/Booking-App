/**
 * @format
 */
import { enableScreens } from 'react-native-screens'
import { AppRegistry } from 'react-native';
import App from './src/App.tsx';
import { name as appName } from './app.json';
enableScreens(true);

AppRegistry.registerComponent(appName, () => App);
