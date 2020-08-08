import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BRAND_LOGO} from '_assets';
import {useTheme} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const SplashScreen = () => {
  const {colors} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.primary}]}>
      <Animatable.Image
        animation="bounceIn"
        iterationCount={1}
        direction="alternate"
        style={styles.imageWrapper}
        source={BRAND_LOGO}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
