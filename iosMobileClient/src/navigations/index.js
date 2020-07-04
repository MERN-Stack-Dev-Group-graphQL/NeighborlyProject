import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import AuthNavigator from './auth-navigator';
import AppNavigator from './app-navigator';

const RootNavigator = createSwitchNavigator(
  {
    // For Authentication
    Auth: AuthNavigator,
    // Main App
    App: AppNavigator,
  },
  {
    initialRouteName: 'Auth',
  },
);

export default createAppContainer(RootNavigator);
