import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';

const SocialLogin = () => {
  return (
    <View style={styles.authSocialWrapper}>
      <TouchableOpacity
        onPress={() => {
          // TODO: Google Authentication
        }}>
        <Image
          style={styles.imageIcon}
          source={require('../../assets/images/auth-google.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // TODO: Facebook Authentication
        }}>
        <Image
          style={styles.imageIcon}
          source={require('../../assets/images/auth-facebook.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // TODO: Apple Authentication
        }}>
        <Image
          style={styles.imageIcon}
          source={require('../../assets/images/auth-apple.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  authSocialWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  imageIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
});

export default SocialLogin;
