import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Image, TouchableHighlight, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import makeApolloClient from './apollo';
import {ApolloProvider} from 'react-apollo';
import Loader from '_core/loader';
// import DrawNavigator from '_navigations/draw-navigator';
// import AppNavigator from '_navigations/app-navigator';
import RootNavigator from '_navigations';
import HomeScreen from '_scenes/home';
import SearchScreen from '_scenes/search';
import ListScreen from '_scenes/listtool';
import ChatScreen from '_scenes/chat';
import ToolsScreen from '_scenes/tools';
import ToolDetailsScreen from '_scenes/tools/details';
import ProfileScreen from '_scenes/profile';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styled from 'styled-components';

Ionicons.loadFont();
Feather.loadFont();
MaterialIcons.loadFont();
MaterialCommunityIcons.loadFont();

// import {AuthProvider} from '_utils/context/auth';

const App = () => {
  const [client, setClient] = useState(null);
  const fetchSession = async () => {
    const client = makeApolloClient();
    setClient(client);
  };

  useEffect(() => {
    fetchSession();
  }, []);

  if (!client) {
    return <Loader />;
  }

  // const LogoTitle = () => {
  //   return (
  //     <Image
  //       style={{width: 168, height: 30}}
  //       source={require('./assets/images/brand-logo-navbar.png')}
  //     />
  //   );
  // };

  // const MenuIcon = ({navigation}) => {
  //   return (
  //     <TouchableHighlight
  //       onPress={() => {
  //         navigation.toggleDrawer();
  //       }}>
  //       <Image
  //         style={{width: 30, height: 20, marginLeft: 10}}
  //         source={require('./assets/images/hamburger.png')}
  //       />
  //     </TouchableHighlight>
  //   );
  // };

  // const config = {
  //   animation: 'spring',
  //   config: {
  //     stiffness: 1000,
  //     damping: 500,
  //     mass: 3,
  //     overshootClamping: true,
  //     restDisplacementThreshold: 0.01,
  //     restSpeedThreshold: 0.01,
  //   },
  // };

  // const Stack = createStackNavigator();
  // const Drawer = createDrawerNavigator();
  // const Tab = createBottomTabNavigator();

  // const MenuDrawer = () => {
  //   return (
  //     <Drawer.Navigator>
  //       <Drawer.Screen
  //         name="Home"
  //         component={HomeScreen}
  //         options={{
  //           drawerIcon: () => {
  //             return <Feather name="home" size={20} />;
  //           },
  //         }}
  //       />
  //       <Drawer.Screen name="Chat" component={ChatScreen} />
  //       <Drawer.Screen name="Tools" component={ToolsScreen} />
  //     </Drawer.Navigator>
  //   );
  // };

  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

const LogOutWrapper = styled.View`
  margin-right: 10px;
`;

export default App;
