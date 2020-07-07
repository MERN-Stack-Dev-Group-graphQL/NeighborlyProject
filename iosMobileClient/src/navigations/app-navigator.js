import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
// Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// Screens
import HomeScreen from '_scenes/home';
import SearchScreen from '_scenes/search';
import ListScreen from '_scenes/listtool';
import ChatScreen from '_scenes/chat';
import ToolsScreen from '_scenes/tools';
import ToolDetailsScreen from '_scenes/tools/details';
// Icons
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// Styles
import styled from 'styled-components';
// Load Icons
Feather.loadFont();
MaterialCommunityIcons.loadFont();

// Initialize Navigation
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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

const Home = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Tool Details"
        component={ToolDetailsScreen}
        options={({route}) => ({title: route.params.name})}
      />
    </Stack.Navigator>
  );
};

const ToolsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Tools" screenOptions={screenOptions}>
      <Stack.Screen
        name="Tools"
        component={ToolsScreen}
        options={{headerTitle: 'Tools'}}
      />
      <Stack.Screen
        name="Tool Details"
        component={ToolDetailsScreen}
        options={({route}) => ({headerTitle: route.params.name})}
      />
    </Stack.Navigator>
  );
};

const SearchStack = () => {
  return (
    <Stack.Navigator initialRouteName="Search" screenOptions={screenOptions}>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{headerTitle: 'Search'}}
      />
    </Stack.Navigator>
  );
};

const ListToolStack = () => {
  return (
    <Stack.Navigator initialRouteName="Tools" screenOptions={screenOptions}>
      <Stack.Screen
        name="List Tool"
        component={ListScreen}
        options={{headerTitle: 'List Your Tool'}}
      />
      <Stack.Screen
        name="Tool Details"
        component={ToolDetailsScreen}
        options={({route}) => ({title: route.params.name})}
      />
    </Stack.Navigator>
  );
};

const ChatStack = () => {
  return (
    <Stack.Navigator initialRouteName="Chat" screenOptions={screenOptions}>
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{headerTitle: 'Chatroom'}}
      />
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
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="List Tool" component={ListToolStack} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Chat" component={ChatStack} />
      <Tab.Screen name="Tools" component={ToolsStack} />
    </Tab.Navigator>
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

export default AppNavigator;
