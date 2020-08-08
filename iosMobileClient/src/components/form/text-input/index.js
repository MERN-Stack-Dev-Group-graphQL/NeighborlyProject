import React from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');
const TextInput = ({iconValid, iconError, touched, error, style, ...props}) => {
  const {colors} = useTheme();
  const errColor = !touched
    ? colors.primaryDarkOpaque
    : error
    ? colors.alertHigh
    : colors.primary;

  return (
    <View>
      <View
        style={[
          styles.formContainer,
          {...style, borderColor: errColor, backgroundColor: colors.white},
        ]}>
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
        <Text style={[styles.errorMessage, {color: colors.accentLight}]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 50,
    width: width - 32,
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
    paddingHorizontal: 10,
    marginBottom: 16,
  },
});

export default TextInput;
