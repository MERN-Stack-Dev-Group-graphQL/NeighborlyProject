import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Star = ({selected = false, onPress = f => f}) => {
  return selected ? (
    <MaterialCommunityIcons
      name="star"
      color={'rgb(252, 155, 70)'}
      size={14}
      onPress={onPress}
    />
  ) : (
    <MaterialCommunityIcons
      name="star"
      color={'rgba(0,0,0,0.25)'}
      size={14}
      onPress={onPress}
    />
  );
};

export default Star;
