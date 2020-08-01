import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const StarCount = ({starCount, rateCount}) => {
  let content = [];
  for (let i = 0; i < starCount; i++) {
    content.push(
      <MaterialCommunityIcons
        name="star"
        color={'rgb(252, 155, 70)'}
        size={14}
        key={i}
      />,
    );
  }

  return (
    <View style={styles.starCountWrapper}>
      {content}
      <MaterialCommunityIcons
        name="star"
        color={'rgba(0,0,0,0.25)'}
        size={14}
      />
      {rateCount && <Text style={styles.rateCountWrapper}>({rateCount})</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  starCountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    color: 'rgb(252, 155, 70)',
  },
  rateCountWrapper: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.25)',
    marginLeft: 10,
  },
});

export default StarCount;
