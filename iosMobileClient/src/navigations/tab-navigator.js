import React from 'react';
import {Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeTopTabScreen from '_components/tabviewmenubar';
import SearchScreen from '_scenes/search';
import ListScreen from '_scenes/listtool';
import ChatScreen from '_scenes/chat';
import ToolsScreen from '_scenes/tools';
import ToolDetailsScreen from '_scenes/tools/details';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const AppTab = createBottomTabNavigator();

const styles = StyleSheet.create({
  headerRightNav: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  hamburgerMenu: {
    width: 30,
    height: 20,
    marginLeft: 10,
  },
  brandLogoImage: {
    width: 168,
    height: 30,
  },
});

const BrandLogo = () => {
  return (
    <Image
      style={styles.brandLogoImage}
      source={require('../assets/images/brand-logo-navbar.png')}
    />
  );
};

const screenOptions = ({navigation, route}) => ({
  headerTitle: props => <BrandLogo {...props} />,
  headerRight: () => (
    <View style={styles.headerRightNav}>
      <Image
        style={styles.avatar}
        source={{
          uri: 'https://randomuser.me/api/portraits/men/1.jpg',
        }}
      />
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Image
          style={styles.hamburgerMenu}
          source={require('../assets/images/hamburger.png')}
        />
      </TouchableOpacity>
    </View>
  ),
  headerStyle: {
    backgroundColor: '#003167',
    shadowOffset: {height: 0, width: 0},
  },
  headerTintColor: 'rgba(255,255,255, 1)',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
});

const HomeTabScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeTopTabScreen} />
      <Stack.Screen
        name="Tool Details"
        component={ToolDetailsScreen}
        options={({route}) => ({title: route.params.name})}
      />
    </Stack.Navigator>
  );
};

const ToolsTabScreen = () => {
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

const SearchTabScreen = () => {
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

const ListToolTabScreen = () => {
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

const ChatTabScreen = () => {
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

const TabNavigator = () => {
  return (
    <AppTab.Navigator
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
        activeTintColor: '#0B57BF',
        inactiveTintColor: 'gray',
      }}>
      <AppTab.Screen name="Search" component={SearchTabScreen} />
      <AppTab.Screen name="List Tool" component={ListToolTabScreen} />
      <AppTab.Screen name="Home" component={HomeTabScreen} />
      <AppTab.Screen name="Chat" component={ChatTabScreen} />
      <AppTab.Screen name="Tools" component={ToolsTabScreen} />
    </AppTab.Navigator>
  );
};

export default TabNavigator;
