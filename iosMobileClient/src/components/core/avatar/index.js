import React from 'react';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, Image} from 'react-native';

const Avatar = ({avatar}) => {
  const {colors} = useTheme();

  return (
    <View style={{borderColor: colors.white}}>
      <Image
        source={{
          uri: `${avatar.url}`,
        }}
        style={(styles.avatar, {...avatar.styles})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 50,
    borderWidth: 4,
  },
});

export default Avatar;
