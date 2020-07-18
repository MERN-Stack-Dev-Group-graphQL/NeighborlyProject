import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

const TabViewMenuBar = () => {
  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabViewMenu}>
        <MaterialCommunityIcons
          name="cards-variant"
          color={'rgba(0,0,0,0.25)'}
          size={24}
        />
        <Text>Card View</Text>
      </View>
      <View style={styles.tabViewMenu}>
        <MaterialCommunityIcons
          name="format-list-bulleted-square"
          color={'rgba(0,0,0,0.25)'}
          size={24}
        />
        <Text>List View</Text>
      </View>
      <View style={styles.tabViewMenu}>
        <MaterialCommunityIcons
          name="map-marker-outline"
          color={'rgba(0,0,0,0.25)'}
          size={24}
        />
        <Text>Map View</Text>
      </View>
    </View>
  );
};

export default TabViewMenuBar;
