import {createBottomTabNavigator} from 'react-navigation-tabs';

import SearchScreen from '_scenes/search';
import ListToolScreen from '_scenes/listtool';
import HomeScreen from '_scenes/home';
import ChatScreen from '_scenes/chat';
import ToolsScreen from '_scenes/tools';

const TabNavigatorConfig = {
  initialRouteName: 'Home',
  header: null,
  headerMode: 'none',
};

const RouteConfigs = {
  Search: {
    screen: SearchScreen,
  },
  ListTool: {
    screen: ListToolScreen,
  },
  Home: {
    screen: HomeScreen,
  },
  Chat: {
    screen: ChatScreen,
  },
  Tools: {
    screen: ToolsScreen,
  },
};

const AppNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;

// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import SearchScreen from '_scenes/search';
// import ListToolScreen from '_scenes/listtool';
// import HomeScreen from '_scenes/home';
// import ChatScreen from '_scenes/chat';
// import ToolsScreen from '_scenes/tools';

// const Tab = createBottomTabNavigator();

// const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Search" component={SearchScreen} />
//         <Tab.Screen name="ListTool" component={ListToolScreen} />
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Chat" component={ChatScreen} />
//         <Tab.Screen name="Tools" component={ToolsScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;
