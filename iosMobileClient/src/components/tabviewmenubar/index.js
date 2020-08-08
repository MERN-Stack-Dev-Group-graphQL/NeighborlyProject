import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTheme} from '@react-navigation/native';
import CardView from '_scenes/home/cardview';
import ListView from '_scenes/home/listview';
import HomeMapView from '_scenes/home/mapview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialTopTabNavigator();

const HomeTabBarTop = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: colors.white,
        style: {backgroundColor: colors.primary},
        indicatorStyle: {backgroundColor: colors.seconday, height: 3},
      }}>
      <Tab.Screen
        name="Card View"
        component={CardView}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="cards-variant"
              color={colors.seconday}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="List View"
        component={ListView}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="format-list-bulleted-square"
              color={colors.seconday}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map View"
        component={HomeMapView}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="map-marker-outline"
              color={colors.seconday}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabBarTop;
