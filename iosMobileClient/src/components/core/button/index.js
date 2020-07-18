import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

TouchableOpacity.defaultProps = {activeOpacity: 0.8};

const styles = StyleSheet.create({
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
    backgroundColor: 'rgba(255, 194, 11, 1)',
    textTransform: 'uppercase',
    marginBottom: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonContainerOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003167',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  buttonTextOutline: {
    color: 'rgba(255, 255,255, 1)',
    fontWeight: 'normal',
  },
});

export const AppButton = ({onPress, title}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export const AppButtonOutline = ({onPress, title}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, styles.buttonContainerOutline]}
      onPress={onPress}>
      <Text style={[styles.buttonText, styles.buttonTextOutline]}>{title}</Text>
    </TouchableOpacity>
  );
};
