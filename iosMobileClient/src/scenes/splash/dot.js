import React from 'react';
import Animated, {interpolate, Extrapolate} from 'react-native-reanimated';
import {useTheme} from '@react-navigation/native';

const Dot = ({index, currentIndex}) => {
  const {colors} = useTheme();
  const opacity = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.5, 1, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });

  const scale = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.75, 1.25, 0.75],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View
      style={{
        opacity,
        backgroundColor: colors.primary,
        height: 8,
        width: 8,
        borderRadius: 4,
        margin: 4,
        transform: [{scale}],
      }}
    />
  );
};

export default Dot;
