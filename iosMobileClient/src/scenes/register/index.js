import React, {useState, useContext} from 'react';
import {useMutation} from '@apollo/client';
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import {AuthContext} from '_utils/context/';
import {AppButton} from '_components/core/button';
import TextInput from '_components/form/text-input';
import Loader from '_core/loader';
import AuthContainer from '_components/auth-container';
import DismissKeyboard from '_core/dismiss-keyboard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import * as Yup from 'yup';

import {BG_IMAGE, BRAND_LOGO, BRAND_LOGO_NAME} from '_assets';
import {REGISTER_USER} from '_utils/graphql';

const styles = StyleSheet.create({
  label: {
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
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

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('A username is required'),
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your First Name'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your Last Name'),
  email: Yup.string()
    .email('Invalid email')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  confirmPassword: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const RegisterScreen = ({navigation}) => {
  const {registerUser} = useContext(AuthContext);
  const [userData, setUserData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    secureTextEntry: true,
  });

  const [register, {loading}] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: {register: userData},
      },
    ) {
      registerUser(userData);
    },
    variables: userData,
  });

  const registerHandle = async (
    username,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  ) => {
    try {
      setUserData({
        ...userData,
        username,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });

      await register(
        username,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DismissKeyboard>
      <ImageBackground source={BG_IMAGE} style={styles.backgroundImage}>
        <AuthContainer>
          <StatusBar barStyle="light-content" backgroundColor="#003167" />
          <Loader loading={loading} />

          <Animatable.Image
            animation="bounceIn"
            iterationCount={1}
            direction="alternate"
            style={styles.imageWrapper}
            source={BRAND_LOGO}
          />
          <Animatable.Image
            animation="bounceIn"
            iterationCount={1}
            direction="alternate"
            style={[styles.imageWrapper, {marginBottom: 40}]}
            source={BRAND_LOGO_NAME}
          />

          <Formik
            validationSchema={RegisterSchema}
            initialValues={{
              username: '',
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={values =>
              registerHandle(
                values.username,
                values.firstName,
                values.lastName,
                values.email,
                values.password,
                values.confirmPassword,
              )
            }>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={{width: '100%', alignItems: 'center'}}>
                <TextInput
                  iconError="account-outline"
                  iconValid="account-outline"
                  placeholder="Username"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  autoCapitalize="none"
                  error={errors.username}
                  touched={touched.username}
                />

                <TextInput
                  iconError="account-outline"
                  iconValid="account-outline"
                  placeholder="First Name"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  autoCapitalize="none"
                  error={errors.firstName}
                  touched={touched.firstName}
                />

                <TextInput
                  iconError="account-outline"
                  iconValid="account-outline"
                  placeholder="Last Name"
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  autoCapitalize="none"
                  error={errors.lastName}
                  touched={touched.lastName}
                />

                <TextInput
                  iconError="email-outline"
                  iconValid="email-outline"
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  autoCapitalize="none"
                  error={errors.email}
                  touched={touched.email}
                />

                <TextInput
                  iconError="lock-open-outline"
                  iconValid="lock-outline"
                  placeholder="Password"
                  secureTextEntry={userData.secureTextEntry ? true : false}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  autoCapitalize="none"
                  error={errors.password}
                  touched={touched.password}
                />

                <TextInput
                  iconError="lock-open-outline"
                  iconValid="lock-outline"
                  placeholder="Confirm Password"
                  secureTextEntry={userData.secureTextEntry ? true : false}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  autoCapitalize="none"
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                />

                <AppButton
                  title="Create account"
                  size="sm"
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>

          <TouchableHighlight onPress={() => navigation.navigate('Login')}>
            <Text style={styles.paragraph}>
              Already have an account? <Text style={styles.label}>Login </Text>
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
        </AuthContainer>
      </ImageBackground>
    </DismissKeyboard>
  );
};

export default RegisterScreen;
