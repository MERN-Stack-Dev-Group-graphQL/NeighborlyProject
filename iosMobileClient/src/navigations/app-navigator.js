import React from 'react';
import {Image, TouchableHighlight, Alert} from 'react-native';
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
