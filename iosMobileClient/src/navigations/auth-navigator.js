import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '_scenes/login';
import RegisterScreen from '_scenes/register';

const AuthNavigatorConfig = {
  initialRouteName: 'Login',
  header: null,
  headerMode: 'none',
};

const RouteConfigs = {
  Login: LoginScreen,
  Register: RegisterScreen,
};

const AuthNavigator = createStackNavigator(RouteConfigs, AuthNavigatorConfig);

export default AuthNavigator;
