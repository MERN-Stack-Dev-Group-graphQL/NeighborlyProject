import React from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CardView from '_scenes/home/cardview';
import ListView from '_scenes/home/listview';
import HomeMapView from '_scenes/home/mapview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  tabContainer: {
    position: 'relative',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 40,
    alignItems: 'center',
    marginTop: 10,
    zIndex: 1,
  },
  tabViewMenu: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const HomeTabBarTop = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#ffffff',
        style: {backgroundColor: '#003167'},
        indicatorStyle: {backgroundColor: '#318FE6', height: 3},
      }}>
      <Tab.Screen
        name="Card View"
        component={CardView}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="cards-variant"
              color={'#318FE6'}
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
              color={'#318FE6'}
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
              color={'#318FE6'}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabBarTop;
