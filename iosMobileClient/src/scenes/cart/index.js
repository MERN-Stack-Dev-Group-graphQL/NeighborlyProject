import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {UserContext} from '_utils/context/';
import {useTheme} from '@react-navigation/native';
import Divider from '_core/divider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');
const HEIGHT = height;

const About = ({navigation}) => {
  const {user} = useContext(UserContext);
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.alignContent}>
        <MaterialCommunityIcons
          name="cart"
          size={60}
          style={[
            styles.cartIcon,
            {
              marginRight: 10,
              marginBottom: 20,
              color: 'rgba(0,0,0,0.15)',
            },
          ]}
        />
        <Text style={{fontSize: 16, width: width - 80, textAlign: 'center'}}>
          Fill your cart with great tools from the Neighborly App
        </Text>
        <Button title="Back Home" onPress={() => navigation.navigate('Home')} />
      </View>
      <View style={styles.footer}>
        <Divider />
        <TouchableOpacity
          style={[styles.buttonContainer, {backgroundColor: colors.primary}]}
          onPress={() => {}}>
          <Text style={[styles.buttonText, {color: colors.white}]}>
            Rent A Tool Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT,
  },
  alignContent: {
    flexGrow: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    marginBottom: 20,
  },
  buttonContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: width - 32,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default About;
