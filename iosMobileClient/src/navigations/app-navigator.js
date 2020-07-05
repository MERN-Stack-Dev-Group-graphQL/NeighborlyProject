import React, {useState, useEffect} from 'react';
import {Image, TouchableHighlight, Button, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '_scenes/home';
import SearchScreen from '_scenes/search';
import ListScreen from '_scenes/listtool';
import ChatScreen from '_scenes/chat';
import ToolsScreen from '_scenes/tools';
import ToolDetailsScreen from '_scenes/tools/details';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

Ionicons.loadFont();
Feather.loadFont();
MaterialIcons.loadFont();
MaterialCommunityIcons.loadFont();

const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Root = () => {
  const MenuIcon = ({navigation}) => {
    return (
      <TouchableHighlight
        onPress={() => {
          navigation.toggleDrawer();
        }}>
        <Image
          style={{width: 30, height: 20, marginLeft: 10}}
          source={require('../assets/images/hamburger.png')}
        />
      </TouchableHighlight>
    );
  };

  const LogoTitle = () => {
    return (
      <Image
        style={{width: 168, height: 30}}
        source={require('../assets/images/brand-logo-navbar.png')}
      />
    );
  };

  const handleOnPress = () => {
    Alert.alert('Menu clicked');
  };
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({navigation, route}) => ({
        headerTitle: props => <LogoTitle {...props} />,
        headerStyle: {
          backgroundColor: 'rgba(16, 43, 70, 1)',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => <MenuIcon onPress={handleOnPress} />,
        headerRight: () => (
          <LogOutWrapper>
            <Feather name="log-out" size={20} color="white" />
          </LogOutWrapper>
        ),
      })}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Tools" component={ToolsScreen} />
      <Stack.Screen name="Tool Details" component={ToolDetailsScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chat' : 'chat-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'text-search' : 'text-box-search-outline';
          } else if (route.name === 'List Tool') {
            iconName = focused ? 'playlist-plus' : 'format-list-text';
          } else if (route.name === 'Tools') {
            iconName = focused ? 'tools' : 'tools';
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} color={color} size={30} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'rgba(16, 43, 70, 1)',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="List Tool" component={ListScreen} />
      <Tab.Screen name="Home" component={Root} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Tools" component={ToolsScreen} />
    </Tab.Navigator>
  );
};

const LogOutWrapper = styled.View`
  margin-right: 10px;
`;

export default AppNavigator;

/* import React from 'react';
import {TouchableHighlight, Image} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Scenes
import HomeScreen from '_scenes/home';
import SearchScreen from '_scenes/search';
import ListToolScreen from '_scenes/listtool';
import ChatScreen from '_scenes/chat';
import ToolsScreen from '_scenes/tools';
// import ToolDetailsScreen from '_scenes/tools/details';
// import ProfileScreen from '_scenes/profile';
import styled from 'styled-components';

Ionicons.loadFont();
Feather.loadFont();
MaterialIcons.loadFont();

const LogoTitle = () => {
  return (
    <Image
      style={{width: 168, height: 30}}
      source={require('./assets/images/brand-logo-navbar.png')}
    />
  );
};

const MenuIcon = ({navigation}) => {
  return (
    <TouchableHighlight
      onPress={() => {
        navigation.toggleDrawer();
      }}>
      <Image
        style={{width: 30, height: 20, marginLeft: 10}}
        source={require('./assets/images/hamburger.png')}
      />
    </TouchableHighlight>
  );
};

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'rgba(16, 43, 70, 1)',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: props => <MenuIcon {...props} />,
        headerRight: () => (
          <LogOutWrapper>
            <Feather name="log-out" size={20} color="white" />
          </LogOutWrapper>
        ),
      }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="List Tools" component={ListToolScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Tools" component={ToolsScreen} />
    </Stack.Navigator>
  );
};

const LogOutWrapper = styled.View`
  margin-right: 10px;
`;

export default AppNavigator;

// const TabNavigatorConfig = {
//   initialRouteName: 'Home',
//   header: null,
//   headerMode: 'none',
//   tabBarOptions: {
//     activeTintColor: '#16304D',
//     inactiveTintColor: 'grey',
//     showIcon: true,
//   },
// };

// const RouteConfigs = {
//   Search: {
//     screen: SearchScreen,
//     navigationOptions: {
//       tabBarLabel: 'Search',
//       tabBarIcon: ({tintColor}) => (
//         <Feather name="search" color={tintColor} size={20} />
//       ),
//     },
//   },
//   ListTool: {
//     screen: ListToolScreen,
//     navigationOptions: {
//       tabBarLabel: 'List Tool',
//       tabBarIcon: ({tintColor}) => (
//         <MaterialIcons name="playlist-add" color={tintColor} size={20} />
//       ),
//     },
//   },
//   Home: {
//     screen: HomeScreen,
//     navigationOptions: {
//       tabBarLabel: 'Home',
//       tabBarIcon: ({tintColor}) => (
//         <MaterialIcons name="home" color={tintColor} size={30} />
//       ),
//     },
//   },
//   Chat: {
//     screen: ChatScreen,
//     navigationOptions: {
//       tabBarLabel: 'Chat',
//       tabBarIcon: ({tintColor}) => (
//         <Ionicons name="chatbubbles-outline" color={tintColor} size={20} />
//       ),
//     },
//   },
//   Tools: {
//     screen: ToolsScreen,
//     navigationOptions: {
//       tabBarLabel: 'Save Tool',
//       tabBarIcon: ({tintColor}) => (
//         <Feather name="bookmark" color={tintColor} size={20} />
//       ),
//     },
//   },
// };

// const AppNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

// export default createAppContainer(AppNavigator);
 */
