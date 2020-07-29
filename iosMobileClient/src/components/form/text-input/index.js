import React from 'react';
import {View, Text, TextInput as RNTextInput, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 50,
    width: '100%',
    maxWidth: 320,
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: StyleSheet.hairlineWidth,
  },
  formControl: {
    flex: 1,
    padding: 0,
  },
  formFieldIcon: {
    paddingRight: 8,
  },
  errorMessage: {
    color: 'rgba(255, 194, 11, 1)',
    paddingHorizontal: 10,
    marginBottom: 16,
  },
});

const TextInput = ({iconValid, iconError, touched, error, ...props}) => {
  const errColor = !touched
    ? 'rgba(16, 43, 70, 0.25)'
    : error
    ? '#FF4858'
    : '#003167';

  return (
    <View>
      <View style={[styles.formContainer, {borderColor: errColor}]}>
        <View style={styles.formFieldIcon}>
          <MaterialCommunityIcons
            name={!error ? iconValid : iconError}
            color={errColor}
            size={24}
          />
        </View>
        <RNTextInput {...props} style={styles.formControl} />
        {touched && (
          <MaterialCommunityIcons
            name={!error ? 'checkbox-marked-circle' : 'close-circle'}
            color={errColor}
            size={20}
          />
        )}
      </View>
      {error && touched ? (
        <Text style={styles.errorMessage}>{error}</Text>
      ) : null}
    </View>
  );
};

export default TextInput;
