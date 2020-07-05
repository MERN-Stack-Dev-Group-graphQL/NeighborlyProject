/* import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
// import {createDrawerNavigator} from 'react-navigation-drawer';
// import {createStackNavigator} from 'react-navigation-stack';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import RootNavigator from './index';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import HomeScreen from '_scenes/home';
import ProfileScreen from '_scenes/profile';
import ToolsScreen from '_scenes/tools';
import OnlineUsersScreen from '_scenes/users';

import styled from 'styled-components';

Ionicons.loadFont();
Feather.loadFont();
FontAwesome.loadFont();
MaterialIcons.loadFont();
Entypo.loadFont();

const UsersStack = createStackNavigator({
  Users: {
    screen: OnlineUsersScreen,
    navigationOptions: () => ({title: 'Online Users'}),
  },
});

const DrawNavigatorConfig = {
  initialRouteName: 'Neighborly',
  navigationOptions: {
    activeTintColor: '#16304D',
    inactiveTintColor: 'grey',
    showIcon: true,
  },
};
const RouteConfigs = {
  Neighborly: RootNavigator,
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      drawerIcon: <Feather name="home" size={20} />,
    },
  },
  Users: {
    screen: UsersStack,
    navigationOptions: {
      drawerIcon: <Feather name="users" size={20} />,
      title: 'Users',
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      drawerIcon: ({tintColor}) => (
        <FontAwesome name="user-o" color={tintColor} size={20} />
      ),
      title: 'Profile',
      // headerLeft: ({navigation}) => (
      //   <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      //     <HamburgerMenu>
      //       <Feather name="menu" size={24} color="black" />
      //     </HamburgerMenu>
      //   </TouchableOpacity>
      // ),
    },
  },
  Tools: {
    screen: ToolsScreen,
    navigationOptions: {
      drawerIcon: <Entypo name="tools" size={20} />,
    },
  },
};

const DrawNavigator = createDrawerNavigator(RouteConfigs, DrawNavigatorConfig);

const HamburgerMenu = styled.View`
  margin-left: 16px;
`;

export default createAppContainer(DrawNavigator);
 */
