import React, {useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Loader from '_core/loader';
import {AppButton} from '_components/core/button';
import DismissKeyboard from '_core/dismiss-keyboard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const bgImage = require('_assets/images/main-background-tools.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: 20,
  },
  heading: {
    width: 200,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#ffffff',
    fontSize: 30,
    marginBottom: 8,
    fontWeight: '400',
  },
  span: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingLeft: 16,
  },
  formControl: {
    width: '100%',
    height: 50,
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginBottom: 16,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 24,
    maxWidth: 220,
    alignSelf: 'flex-start',
  },
  paragraph: {
    fontSize: 14,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: '#003167',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  goBackButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: 50,
    right: 20,
  },
});

const ForgotPasswordScreen = ({navigation}) => {
  const [login, setLogin] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const handleSubmit = () => {
    navigation.navigate('Home');
  };

  const handleOnPressRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <DismissKeyboard>
      <ImageBackground source={bgImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#003167" />
          <Loader loading={loading} />

          <View style={{width: '100%', maxWidth: 320}}>
            <Text style={styles.header}>Forgot password?</Text>

            <TextInput
              label="Email"
              placeholder="Email"
              name="login"
              style={styles.formControl}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={() => {
                setLogin(login);
              }}
              defaultValue={login}
            />
            <AppButton title="Reset" size="sm" onPress={handleSubmit} />

            <TouchableHighlight onPress={handleOnPressRegister}>
              <Text style={styles.paragraph}>
                <Text>You don’t have an account? </Text>
                <Text style={styles.span}>Register</Text> here.
              </Text>
            </TouchableHighlight>
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.goBackButton}>
            <MaterialCommunityIcons
              name="close"
              color={'rgba(255,255,255,1)'}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </DismissKeyboard>
  );
};

export default ForgotPasswordScreen;
