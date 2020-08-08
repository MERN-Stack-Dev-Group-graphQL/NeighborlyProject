import React from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');
export const SLIDE_HEIGHT = 0.61 * height;
export const BORDER_RADIUS = 45;

const Slide = ({title, right}) => {
  const {colors} = useTheme();
  const transform = [
    {translateY: (SLIDE_HEIGHT - 100) / 2},
    {translateX: right ? width / 2 - 50 : -width / 2 + 50},
    {rotate: right ? '90deg' : '-90deg'},
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, {transform}]}>
        <Text style={[styles.title, {color: colors.whiteOpaque}]}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    overflow: 'hidden',
  },
  titleContainer: {
    height: 80,
    justifyContent: 'center',
  },
  title: {
    fontSize: 80,
    lineHeight: 80,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Slide;
