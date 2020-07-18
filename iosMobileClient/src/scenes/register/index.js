import React, {useState, useContext} from 'react';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  StyleSheet,
  StatusBar,
  Text,
  Alert,
  TextInput,
  View,
  Image,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {AuthContext} from '_utils/context/';
import {AppButton} from '_components/core/button';
import Loader from '_core/loader';
import DismissKeyboard from '_core/dismiss-keyboard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const bgImage = require('_assets/images/main-background.png');

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
  fieldIconRight: {},
  errorMessage: {
    color: 'rgba(255, 194, 11, 1)',
    paddingHorizontal: 10,
    marginBottom: 20,
    maxWidth: 320,
  },
  paragraph: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: 10,
  },
  goBackButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: 50,
    right: 20,
  },
});

const RegisterScreen = ({navigation}) => {
  const {loginUser} = useContext(AuthContext);
  // const [animating, setAnimating] = useState(true);
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    checkUsernameChange: false,
    checkFirstNameChange: false,
    checkLastNameChange: false,
    checkEmailChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isPasswordConfirmed: true,
  });

  const [login, {loading}] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: {register: userData},
      },
    ) {
      loginUser(userData);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: userData,
  });

  const registerHandle = (
    username,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  ) => {
    if (userData.firstName.length === 0) {
      Alert.alert('Error', 'Please enter your first name.', [{text: 'Okay'}]);
      return;
    }

    if (userData.lastName.length === 0) {
      Alert.alert('Error', 'Please enter your last name.', [{text: 'Okay'}]);
      return;
    }

    if (userData.email.length === 0) {
      Alert.alert('Error', 'Please enter your last name.', [{text: 'Okay'}]);
      return;
    }

    if (userData.password.length === 0) {
      Alert.alert('Error', 'Password field cannot be empty.', [{text: 'Okay'}]);
      return;
    }

    if (userData.password.length === 0 && userData.email.length === 0) {
      Alert.alert('Invalid User!', 'Email or password is incorrect.', [
        {text: 'Okay'},
      ]);
      return;
    }
    if (userData.confirmPassword.length === 0) {
      Alert.alert('Error', 'Confirm your password.', [{text: 'Okay'}]);
      return;
    }

    login(username, firstName, lastName, email, password, confirmPassword);
  };

  const handleUsernameChange = value => {
    if (value.trim().length >= 4) {
      setUserData({
        ...userData,
        username: value,
        checkUsernameChange: true,
      });
    } else {
      setUserData({
        ...userData,
        username: value,
        checkUsernameChange: false,
      });
    }
  };

  const handleFirstNameChange = value => {
    if (value.trim().length >= 4) {
      setUserData({
        ...userData,
        firstName: value,
        checkFirstNameChange: true,
      });
    } else {
      setUserData({
        ...userData,
        firstName: value,
        checkFirstNameChange: false,
      });
    }
  };

  const handleLastNameChange = value => {
    if (value.trim().length >= 4) {
      setUserData({
        ...userData,
        lastName: value,
        handleLastNameChange: true,
      });
    } else {
      setUserData({
        ...userData,
        lastName: value,
        handleLastNameChange: false,
      });
    }
  };

  const handleEmailChange = value => {
    if (value.trim().length >= 4) {
      setUserData({
        ...userData,
        email: value,
        checkInputChange: true,
        isValidUser: true,
      });
    } else {
      setUserData({
        ...userData,
        email: value,
        checkInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = value => {
    if (value.trim().length >= 6) {
      setUserData({
        ...userData,
        password: value,
        isValidPassword: true,
      });
    } else {
      setUserData({
        ...userData,
        password: value,
        isValidPassword: false,
      });
    }
  };

  const handlePasswordConfirmation = value => {
    if (value.trim().length >= 6) {
      setUserData({
        ...userData,
        confirmPassword: value,
        isPasswordConfirmed: true,
      });
    } else {
      setUserData({
        ...userData,
        confirmPassword: value,
        isPasswordConfirmed: false,
      });
    }
  };

  const handleSecureTextEntry = () => {
    setUserData({
      ...userData,
      secureTextEntry: !userData.secureTextEntry,
    });
  };

  const handleValidUser = value => {
    if (value.trim().length >= 4) {
      setUserData({
        ...userData,
        isValidUser: true,
      });
    } else {
      setUserData({
        ...userData,
        isValidUser: false,
      });
    }
  };

  return (
    <DismissKeyboard>
      <ImageBackground source={bgImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#003167" />
          <Loader loading={loading} />
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
                name="account-outline"
                color={'rgba(16, 43, 70, 0.25)'}
                size={24}
              />
            </View>
            <TextInput
              label="Username"
              placeholder="Username"
              name="username"
              style={styles.formControl}
              onChangeText={value => handleUsernameChange(value)}
              onEndEditing={e => {
                handleValidUser(e.nativeEvent.text);
              }}
            />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.formFieldIcon}>
              <MaterialCommunityIcons
                name="account-outline"
                color={'rgba(16, 43, 70, 0.25)'}
                size={24}
              />
            </View>
            <TextInput
              label="FirstName"
              placeholder="First Name"
              name="firstName"
              style={styles.formControl}
              onChangeText={value => handleFirstNameChange(value)}
              onEndEditing={e => {
                handleValidUser(e.nativeEvent.text);
              }}
            />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.formFieldIcon}>
              <MaterialCommunityIcons
                name="account-outline"
                color={'rgba(16, 43, 70, 0.25)'}
                size={24}
              />
            </View>
            <TextInput
              label="LastName"
              placeholder="Last Name"
              name="lastName"
              style={styles.formControl}
              onChangeText={value => handleLastNameChange(value)}
              onEndEditing={e => {
                handleValidUser(e.nativeEvent.text);
              }}
            />
          </View>

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
              name="email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={value => handleEmailChange(value)}
              onEndEditing={e => {
                handleValidUser(e.nativeEvent.text);
              }}
              style={styles.formControl}
            />
            <TouchableOpacity style={styles.filterIcon}>
              {userData.checkEmailChange ? (
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
                Email must contain more than four (4) characters.
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

          <View style={styles.formContainer}>
            <View style={styles.formFieldIcon}>
              <MaterialCommunityIcons
                name="lock-open-outline"
                color={'rgba(16, 43, 70, 0.25)'}
                size={24}
              />
            </View>

            <TextInput
              label="Confirm Password"
              placeholder="Confirm Password"
              name="confirmPassword"
              autoCapitalize="none"
              secureTextEntry={userData.secureTextEntry ? true : false}
              onChangeText={value => handlePasswordConfirmation(value)}
              style={styles.formControl}
            />

            <TouchableOpacity
              style={styles.filterIcon}
              onPress={handleSecureTextEntry}>
              {userData.secureTextEntry ? (
                <MaterialCommunityIcons
                  name="eye-off-outline"
                  color={
                    userData.confirmPassword !== ''
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

          <AppButton
            title="Create account"
            size="sm"
            onPress={() => {
              registerHandle(userData);
            }}
          />
          <TouchableHighlight onPress={() => navigation.navigate('Login')}>
            <Text style={styles.paragraph}>
              Already have an account? <Text style={styles.label}>Login</Text>{' '}
              here.
            </Text>
          </TouchableHighlight>

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

export default RegisterScreen;

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      input: {
        username: $username
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      token
      _id
    }
  }
`;
