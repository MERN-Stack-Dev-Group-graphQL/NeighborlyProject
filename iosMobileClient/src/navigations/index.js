import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AppNavigator from './app-navigator';
import DrawerNavigator from './draw-navigator';

const Drawer = createDrawerNavigator();

const RootNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={() => <DrawerNavigator />}>
      <Drawer.Screen name="Home" component={AppNavigator} />
    </Drawer.Navigator>
  );
};

export default RootNavigator;
