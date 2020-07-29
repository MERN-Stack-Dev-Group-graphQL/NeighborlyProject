import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from '_navigations/auth-navigator';
import DrawerNavigator from '_navigations/drawer-navigator';
import Modal from '_scenes/modal';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {UserContext} from '_utils/context';
import SplashScreen from '_scenes/splash-screen';

Feather.loadFont();
MaterialCommunityIcons.loadFont();

const RootStack = createStackNavigator();
const screenOptions = ({navigation, route}) => ({
  headerShown: false,
  animationEnabled: false,
});

const RootNavigator = ({isLoading, currentUser}) => {
  const renderScreens = () => {
    if (isLoading) {
      return <RootStack.Screen name="SplashScreen" component={SplashScreen} />;
    }
    return currentUser ? (
      <RootStack.Screen name="DrawerNavigator" name="DrawerNavigator">
        {() => (
          <UserContext.Provider value={currentUser}>
            <DrawerNavigator />
          </UserContext.Provider>
        )}
      </RootStack.Screen>
    ) : (
      <RootStack.Screen name="AuthNavigator" component={AuthNavigator} />
    );
  };

  return (
    <RootStack.Navigator
      headerMode="none"
      screenOptions={screenOptions}
      mode="modal">
      {renderScreens()}
      <RootStack.Screen
        name="Modal"
        component={Modal}
        options={{animationEnabled: true}}
      />
      <RootStack.Screen
        name="BottomScreen"
        component={Modal}
        options={{animationEnabled: true}}
      />
      <RootStack.Screen
        name="Alert"
        component={Modal}
        options={{
          animationEnabled: true,
          cardStyle: {backgroundColor: 'rgba(0,0,0,0.15)'},
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'clamp',
                }),
              },
            };
          },
        }}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
