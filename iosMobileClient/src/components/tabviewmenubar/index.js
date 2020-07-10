import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

const TabViewMenuBar = () => {
  return (
    <View style={styles.tabContainer}>
      <TabViewMenu>
        <MaterialCommunityIcons
          name="cards-variant"
          color={'rgba(0,0,0,0.25)'}
          size={24}
        />
        <Text>Card View</Text>
      </TabViewMenu>
      <TabViewMenu>
        <MaterialCommunityIcons
          name="format-list-bulleted-square"
          color={'rgba(0,0,0,0.25)'}
          size={24}
        />
        <Text>List View</Text>
      </TabViewMenu>
      <TabViewMenu>
        <MaterialCommunityIcons
          name="map-marker-outline"
          color={'rgba(0,0,0,0.25)'}
          size={24}
        />
        <Text>Map View</Text>
      </TabViewMenu>
    </View>
  );
};

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
});

const TabViewMenu = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default TabViewMenuBar;
