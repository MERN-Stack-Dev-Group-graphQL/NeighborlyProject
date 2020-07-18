import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '_scenes/splash';
import LoginScreen from '_scenes/login';
import RegisterScreen from '_scenes/register';
import ForgotPasswordScreen from '_scenes/forgotpassword';
import TabNavigator from '_navigations/tab-navigator';

const Stack = createStackNavigator();

const screenOptions = ({navigation, route}) => ({
  headerShown: false,
});

const RootNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Home" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
