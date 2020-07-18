import React, {useState, useContext} from 'react';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  StatusBar,
  Image,
  ImageBackground,
  Alert,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {AuthContext} from '_utils/context/';
import {AppButton, AppButtonOutline} from '_core/button';
import DismissKeyboard from '_core/dismiss-keyboard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const bgImage = require('_assets/images/main-background-tools.png');

const styles = StyleSheet.create({
  heading: {
    width: 200,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#ffffff',
    fontSize: 30,
    marginBottom: 8,
    fontWeight: '400',
  },
  label: {
    width: 200,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: '#003167',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  imageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  imageIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  formContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 50,
    width: '100%',
    maxWidth: 320,
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  formControl: {
    flex: 1,
    padding: 0,
  },
  formFieldIcon: {
    paddingRight: 8,
  },
  errorMessage: {
    color: 'rgba(255, 194, 11, 1)',
    paddingHorizontal: 10,
    marginBottom: 20,
    maxWidth: 320,
  },
  forgotPassword: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 30,
  },
  authSocialWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  paragraph: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: 10,
  },
  buttonText: {
    color: 'rgba(255, 255, 255, 0.85)',
  },
  goBackButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: 50,
    right: 20,
  },
});

const LoginScreen = ({navigation}) => {
  const {loginUser} = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    login: '',
    password: '',
    checkInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const [getUser, {loading}] = useMutation(LOGIN_USER, {
    update(
      __,
      {
        data: {login: userData},
      },
    ) {
      loginUser(userData);
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: userData,
  });

  const loginHandle = (login, password) => {
    userData.password.length === 0 &&
      userData.login.length === 0 &&
      Alert.alert('Invalid Entry', 'Please enter a valid email and password.', [
        {text: 'Okay'},
      ]);

    userData.login.length === 0 &&
      Alert.alert('Error', 'Email field cannot be empty.', [{text: 'Okay'}]);

    userData.password.length === 0 &&
      Alert.alert('Error', 'Password field cannot be empty.', [{text: 'Okay'}]);

    getUser(login, password);
  };

  const handleTextInputChange = value => {
    value.trim().length >= 4
      ? setUserData({
          ...userData,
          login: value,
          checkInputChange: true,
          isValidUser: true,
        })
      : setUserData({
          ...userData,
          login: value,
          checkInputChange: false,
          isValidUser: false,
        });
  };

  const handlePasswordChange = value => {
    value.trim().length >= 6
      ? setUserData({
          ...userData,
          password: value,
          isValidPassword: true,
        })
      : setUserData({
          ...userData,
          password: value,
          isValidPassword: false,
        });
  };

  const handleSecureTextEntry = () => {
    setUserData({
      ...userData,
      secureTextEntry: !userData.secureTextEntry,
    });
  };

  const handleValidUser = value => {
    value.trim().length >= 4
      ? setUserData({
          ...userData,
          isValidUser: true,
        })
      : setUserData({
          ...userData,
          isValidUser: false,
        });
  };

  return (
    <ImageBackground source={bgImage} style={styles.backgroundImage}>
      <DismissKeyboard>
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />

          <Image
            style={styles.imageWrapper}
            source={require('../../assets/images/brand-logo.png')}
          />
          <Image
            style={[styles.imageWrapper, {marginBottom: 40}]}
            source={require('../../assets/images/brand-text.png')}
          />

          <View style={styles.formContainer}>
            <View style={styles.formFieldIcon}>
              <MaterialCommunityIcons
                name="email-outline"
                color={'rgba(16, 43, 70, 0.25)'}
                size={24}
              />
            </View>
            <TextInput
              label="Email"
              placeholder="Email"
              name="login"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={value => handleTextInputChange(value)}
              onEndEditing={e => {
                handleValidUser(e.nativeEvent.text);
              }}
              style={styles.formControl}
            />
            <TouchableOpacity style={styles.filterIcon}>
              {userData.checkInputChange ? (
                <Animatable.View animation="bounceIn">
                  <MaterialCommunityIcons
                    name="checkbox-marked-circle"
                    color={'#003167'}
                    size={20}
                  />
                </Animatable.View>
              ) : (
                <MaterialCommunityIcons
                  name="checkbox-marked-circle-outline"
                  color={
                    userData.password !== ''
                      ? '#003167'
                      : 'rgba(16, 43, 70, 0.25)'
                  }
                  size={20}
                />
              )}
            </TouchableOpacity>
          </View>
          {userData.isValidUser ? null : (
            <Animatable.View animation="fadeIn" duration={500}>
              <Text style={styles.errorMessage}>
                Username or email address must contain more than four (4)
                characters.
              </Text>
            </Animatable.View>
          )}

          <View style={styles.formContainer}>
            <View style={styles.formFieldIcon}>
              <MaterialCommunityIcons
                name="lock-open-outline"
                color={'rgba(16, 43, 70, 0.25)'}
                size={24}
              />
            </View>

            <TextInput
              label="Password"
              placeholder="Password"
              name="password"
              autoCapitalize="none"
              secureTextEntry={userData.secureTextEntry ? true : false}
              onChangeText={value => handlePasswordChange(value)}
              style={styles.formControl}
            />

            <TouchableOpacity
              style={styles.filterIcon}
              onPress={handleSecureTextEntry}>
              {userData.secureTextEntry ? (
                <MaterialCommunityIcons
                  name="eye-off-outline"
                  color={
                    userData.password !== ''
                      ? '#003167'
                      : 'rgba(16, 43, 70, 0.25)'
                  }
                  size={20}
                />
              ) : (
                <Animatable.View animation="bounceIn">
                  <MaterialCommunityIcons
                    name="eye-outline"
                    color={'#003167'}
                    size={20}
                  />
                </Animatable.View>
              )}
            </TouchableOpacity>
          </View>
          {userData.isValidPassword ? null : (
            <Animatable.View animation="fadeIn" duration={500}>
              <Text style={styles.errorMessage}>
                Password must not be empty and more than eight (8) characters.
              </Text>
            </Animatable.View>
          )}

          <AppButton
            title="Login"
            size="sm"
            onPress={() => {
              loginHandle(userData.login, userData.password);
            }}
          />

          <AppButtonOutline
            title="Register"
            size="sm"
            onPress={() => navigation.navigate('Register')}
          />

          <TouchableHighlight
            onPress={() => navigation.navigate('ForgotPassword')}>
            <View style={styles.forgotPassword}>
              <Text style={styles.buttonText}>Forgot password?</Text>
            </View>
          </TouchableHighlight>

          <View style={styles.authSocialWrapper}>
            <TouchableOpacity
              onPress={() => {
                // TODO: Google Authentication
                Alert.alert('TODO: Google Auth');
              }}>
              <Image
                style={styles.imageIcon}
                source={require('../../assets/images/auth-google.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // TODO: Facebook Authentication
                Alert.alert('TODO: Facebook Auth');
              }}>
              <Image
                style={styles.imageIcon}
                source={require('../../assets/images/auth-facebook.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // TODO: Apple Authentication
                Alert.alert('TODO: Apple Auth');
              }}>
              <Image
                style={styles.imageIcon}
                source={require('../../assets/images/auth-apple.png')}
              />
            </TouchableOpacity>
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
      </DismissKeyboard>
    </ImageBackground>
  );
};

export default LoginScreen;

const LOGIN_USER = gql`
  mutation login($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      token
      _id
    }
  }
`;
