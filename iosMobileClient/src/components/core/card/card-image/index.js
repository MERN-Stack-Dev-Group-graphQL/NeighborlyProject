import React from 'react';
import {Image, StyleSheet} from 'react-native';
import * as routes from '_utils/constants/routes';

export const CardImage = ({path, style}) => {
  if (path.length > 1) {
    return (
      <Image
        source={{
          uri: `${routes.LOCAL_HOST}${path}`,
        }}
        style={[styles.imageBlock, {...style}]}
      />
    );
  }
  return (
    <Image
      source={{
        uri: `${routes.LOCAL_HOST}/assets/img/default.jpg`,
      }}
      style={[styles.imageBlock, {...style}]}
    />
  );
};

const styles = StyleSheet.create({
  imageBlock: {
    ...StyleSheet.absoluteFillObject,
  },
});
