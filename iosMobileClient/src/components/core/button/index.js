import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

TouchableOpacity.defaultProps = {activeOpacity: 0.8};

export const AppButton = ({onPress, title, style}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        {...style, backgroundColor: colors.accentLight},
      ]}
      onPress={onPress}>
      <Text style={[styles.buttonText, {color: colors.primary}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export const AppButtonOutline = ({onPress, title, style}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        styles.buttonContainerOutline,
        {...style, backgroundColor: 'transparent', borderColor: colors.white},
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.buttonText,
          styles.buttonTextOutline,
          {color: colors.white},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const TextButton = ({onPress, title}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  buttonContainer: {
    elevation: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 320,
    height: 50,
    lineHeight: 50,
    borderRadius: 25,
    textTransform: 'uppercase',
    marginBottom: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonContainerOutline: {
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  buttonTextOutline: {
    fontWeight: 'normal',
  },
});
