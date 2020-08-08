import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {useTheme} from '@react-navigation/native';
import {BRAND_LOGO} from '_assets';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

const {width} = Dimensions.get('window');

const ListTool = () => {
  const {colors} = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <View style={[styles.alignContent, {paddingHorizontal: 40}]}>
        <TouchableOpacity
          style={{marginBottom: 24, width: width - 64}}
          onPress={() => {}}>
          <View
            style={[styles.addFirstTool, {borderColor: colors.blackOpaqueLow}]}>
            <MaterialCommunityIcons
              name="plus"
              color={colors.primary}
              size={80}
              style={{opacity: 0.15}}
            />
          </View>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 20,
          }}>
          You have no current or recently listed tools yet
        </Text>
      </View>
      <Animatable.View
        animation="slideInUp"
        iterationCount={1}
        style={[
          styles.footer,
          {
            backgroundColor: colors.primary,
            paddingVertical: 10,
          },
        ]}>
        <Animatable.Image
          animation="bounceIn"
          iterationCount={1}
          direction="alternate"
          style={styles.brandLogo}
          source={BRAND_LOGO}
        />
        <View>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 16,
              paddingBottom: 4,
            }}>
            Let's get neighborly!
          </Text>
          <Text style={{color: colors.whiteOpaqueHigh, fontSize: 12}}>
            Add your first tool by tapping icon above
          </Text>
        </View>
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  alignContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  addFirstTool: {
    padding: 32,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    width: width - 32,
    left: 16,
    right: 16,
    bottom: 16,
    borderRadius: 50,
  },
  brandLogo: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
});

export default ListTool;
