import React from 'react';
import {useTheme} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Star = ({selected = false, onPress = f => f}) => {
  const {colors} = useTheme();

  return selected ? (
    <MaterialCommunityIcons
      name="star"
      color={colors.star}
      size={14}
      onPress={onPress}
    />
  ) : (
    <MaterialCommunityIcons
      name="star"
      color={colors.blackOpaqueLow}
      size={14}
      onPress={onPress}
    />
  );
};

export default Star;
