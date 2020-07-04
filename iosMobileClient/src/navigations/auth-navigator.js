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

// import 'react-native-gesture-handler';
// import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
// import LoginScreen from '_scenes/login';
// import RegisterScreen from '_scenes/register';

// const AuthStack = createStackNavigator();

// const AuthNavigator = () => {
//   return (
//     <AuthStack.Navigator>
//       <AuthStack.Screen name="Login" component={LoginScreen} />
//       <AuthStack.Screen name="Register" component={RegisterScreen} />
//     </AuthStack.Navigator>
//   );
// };

// export default AuthNavigator;
