import React from 'react';
import {View, Dimensions, StyleSheet, ImageBackground} from 'react-native';
import {BG_IMAGE} from '_assets';
import {useTheme} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');
const ratio = 1080 / 1920;
const HEIGHT = width * ratio;

const Header = ({title, navigation}) => {
  const {colors} = useTheme();

  return (
    <View style={[styles.header, {backgroundColor: colors.primary}]}>
      <ImageBackground source={BG_IMAGE} style={styles.headerImage}>
        <View style={styles.actionBar}>
          <MaterialCommunityIcons
            name="search-web"
            color={colors.primaryDarkOpaque}
            size={24}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

Header.defaultProps = {
  title: 'Neighborly',
};

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    width,
    height: HEIGHT,
    overflow: 'hidden',
  },
  headerImage: {
    flexGrow: 1,
    width,
  },
});

export default Header;
