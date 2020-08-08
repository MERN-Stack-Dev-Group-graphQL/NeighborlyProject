import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

const FooterSlide = ({header, description, last, onPress, onSkip}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.header, {color: colors.black}]}>{header}</Text>
      <Text style={[styles.description, {color: colors.blackOpaqueHigh}]}>
        {description}
      </Text>

      <View style={styles.footerButtons}>
        {last ? (
          <View />
        ) : (
          <TouchableOpacity onPress={onSkip} style={{flex: 1}}>
            <View>
              <Text style={[styles.skipText, {color: colors.blackOpaque}]}>
                Skip
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity {...{onPress}} style={{flex: 1}}>
          <View
            style={[
              styles.cta,
              {backgroundColor: last ? colors.primaryLight : colors.accent},
            ]}>
            <Text style={{fontSize: 20, color: colors.white}}>
              {last ? "Let's get Started" : 'Next'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  header: {
    fontSize: 26,
    lineHeight: 30,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 16,
  },
  footerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipText: {
    fontWeight: 'bold',
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 16,
    marginVertical: 10,
  },
});

export default FooterSlide;
