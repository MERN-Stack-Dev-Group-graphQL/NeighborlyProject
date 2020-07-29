import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
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
  label: {
    color: '#ffffff',
  },
  errorMessage: {
    color: 'rgba(255, 194, 11, 1)',
    paddingHorizontal: 10,
    marginBottom: 16,
  },
});

const CheckBox = ({label, onChange, checked, ...props}) => {
  return (
    <TouchableOpacity
      style={{justifyContent: 'center'}}
      onPress={() => onChange()}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          {...props}
          style={{
            marginRight: 10,
            height: 20,
            width: 20,
            color: '#000',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: checked ? 'rgba(255, 194, 11, 1)' : '#ffffff',
            backgroundColor: checked ? 'rgba(255, 194, 11, 1)' : '#003167',
          }}>
          <MaterialCommunityIcons name="check" color="#003167" size={16} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CheckBox;
