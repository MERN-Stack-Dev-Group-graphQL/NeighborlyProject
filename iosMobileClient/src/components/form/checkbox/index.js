import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CheckBox = ({label, onChange, checked, ...props}) => {
  const {colors} = useTheme();

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
            color: colors.black,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: checked ? colors.accentLight : colors.white,
            backgroundColor: checked ? colors.accentLight : colors.primary,
          }}>
          <MaterialCommunityIcons
            name="check"
            color={colors.primary}
            size={16}
          />
        </View>
        <Text style={{color: colors.white}}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

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
});

export default CheckBox;
