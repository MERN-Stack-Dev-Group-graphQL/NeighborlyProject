import React from 'react';
import {useTheme} from '@react-navigation/native';
import {View, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const StarCount = ({starCount, rateCount}) => {
  const {colors} = useTheme();

  let content = [];
  for (let i = 0; i < starCount; i++) {
    content.push(
      <MaterialCommunityIcons
        name="star"
        color={colors.star}
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
        color={colors.blackOpaqueLow}
        size={14}
      />
      {rateCount && (
        <Text style={[styles.rateCountWrapper, {color: colors.blackOpaqueLow}]}>
          ({rateCount})
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  starCountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  rateCountWrapper: {
    fontSize: 12,

    marginLeft: 10,
  },
});

export default StarCount;
