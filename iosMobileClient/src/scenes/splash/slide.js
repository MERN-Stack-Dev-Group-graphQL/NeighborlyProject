import React from 'react';
import {Text, View, Image, Dimensions, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('window');
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
    color: 'rgba(255,255,255,0.05)',
    textAlign: 'center',
  },
});

export const SLIDE_HEIGHT = 0.61 * height;
export const BORDER_RADIUS = 45;

const Slide = ({title, right}) => {
  const transform = [
    {translateY: (SLIDE_HEIGHT - 100) / 2},
    {translateX: right ? width / 2 - 50 : -width / 2 + 50},
    {rotate: right ? '90deg' : '-90deg'},
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, {transform}]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default Slide;
