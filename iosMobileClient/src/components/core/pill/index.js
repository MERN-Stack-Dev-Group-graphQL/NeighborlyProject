import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Pill = ({title, iconLeft, iconRight}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={[styles.actionButton, {borderColor: colors.blackOpaqueLow}]}>
      {iconLeft !== '' && (
        <MaterialCommunityIcons
          name={iconLeft}
          color={colors.black}
          size={20}
        />
      )}
      <Text style={styles.actionText}>{title}</Text>
      {iconRight !== '' && (
        <MaterialCommunityIcons
          name={iconRight}
          color={colors.black}
          size={20}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  actionText: {
    fontSize: 14,
  },
});

export default Pill;
