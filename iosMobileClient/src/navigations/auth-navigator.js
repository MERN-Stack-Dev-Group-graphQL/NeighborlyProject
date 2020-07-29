import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '_scenes/splash';
import LoginScreen from '_scenes/login';
import RegisterScreen from '_scenes/register';
import ForgotPasswordScreen from '_scenes/forgotpassword';

const AuthStack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="Splash" component={Splash} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
