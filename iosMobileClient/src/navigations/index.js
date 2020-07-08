import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import AppNavigator from './app-navigator';
import DrawerNavigator from './draw-navigator';
// Scenes
import ProfileScreen from '_scenes/profile';
import AccountActivityScreen from '_scenes/account-activity';
import NotificationsScreen from '_scenes/notifications';
import FiltersScreen from '_scenes/filters';
import SavedToolsScreen from '_scenes/tools/saved';
import TrackToolsScreen from '_scenes/tools/track';
// Styles
import styled from 'styled-components';

// Initialize Navigation
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const BrandLogo = () => {
  return (
    <BrandLogoImage
      source={require('../assets/images/brand-logo-navbar.png')}
    />
  );
};

const screenOptions = ({navigation, route}) => ({
  headerTitle: props => <BrandLogo {...props} />,
  headerRight: () => (
    <HeaderRightNav>
      <Avatar
        source={{
          uri: 'https://randomuser.me/api/portraits/men/1.jpg',
        }}
      />
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <HamburgerMenu source={require('../assets/images/hamburger.png')} />
      </TouchableOpacity>
    </HeaderRightNav>
  ),
  headerStyle: {
    backgroundColor: 'rgba(16, 43, 70, 1)',
    shadowOffset: {height: 0, width: 0},
  },
  headerTintColor: 'rgba(255,255,255, 1)',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
});

const Profile = () => {
  return (
    <Stack.Navigator initialRouteName="Profile" screenOptions={screenOptions}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerTitle: 'Profile'}}
      />
    </Stack.Navigator>
  );
};

const AccountActivity = () => {
  return (
    <Stack.Navigator
      initialRouteName="Account Activity"
      screenOptions={screenOptions}>
      <Stack.Screen
        name="Account Activity"
        component={AccountActivityScreen}
        options={{headerTitle: 'Account Activity'}}
      />
    </Stack.Navigator>
  );
};

const Notifications = () => {
  return (
    <Stack.Navigator
      initialRouteName="Notifications"
      screenOptions={screenOptions}>
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{headerTitle: 'Notifications'}}
      />
    </Stack.Navigator>
  );
};

const Filters = () => {
  return (
    <Stack.Navigator initialRouteName="Filters" screenOptions={screenOptions}>
      <Stack.Screen
        name="Filters"
        component={FiltersScreen}
        options={{headerTitle: 'Filters'}}
      />
    </Stack.Navigator>
  );
};

const SavedTools = () => {
  return (
    <Stack.Navigator
      initialRouteName="Saved Tools"
      screenOptions={screenOptions}>
      <Stack.Screen
        name="Saved Tools"
        component={SavedToolsScreen}
        options={{headerTitle: 'Saved Tools'}}
      />
    </Stack.Navigator>
  );
};

const TrackTools = () => {
  return (
    <Stack.Navigator
      initialRouteName="Track Tools"
      screenOptions={screenOptions}>
      <Stack.Screen
        name="Track Tools"
        component={TrackToolsScreen}
        options={{headerTitle: 'Track Tools'}}
      />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerNavigator {...props} />}>
      <Drawer.Screen name="Home" component={AppNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Account Activity" component={AccountActivity} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="Filters" component={Filters} />
      <Drawer.Screen name="Saved Tools" component={SavedTools} />
      <Drawer.Screen name="Track Tools" component={TrackTools} />
    </Drawer.Navigator>
  );
};

const HeaderRightNav = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 16px;
`;

const Avatar = styled.Image`
  height: 36px;
  width: 36px;
  border-radius: 18px;
  border-width: 2px;
  border-color: #ffffff;
`;

const HamburgerMenu = styled.Image`
  width: 30px;
  height: 20px;
  margin-left: 10px;
`;

const BrandLogoImage = styled.Image`
  width: 168px;
  height: 30px;
`;

export default RootNavigator;
