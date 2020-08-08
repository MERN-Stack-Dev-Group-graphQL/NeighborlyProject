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
import {useTheme} from '@react-navigation/native';
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
  const {colors} = useTheme();
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
      <ImageBackground
        source={BG_IMAGE}
        style={[styles.backgroundImage, {backgroundColor: colors.primary}]}>
        <AuthContainer>
          <StatusBar
            barStyle="light-content"
            backgroundColor={colors.primary}
          />
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
            <Text style={[styles.paragraph, {color: colors.white}]}>
              Already have an account?{' '}
              <Text style={[styles.label, {color: colors.white}]}>Login </Text>
              here.
            </Text>
          </TouchableHighlight>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.goBackButton}>
            <MaterialCommunityIcons
              name="close"
              color={colors.white}
              size={24}
            />
          </TouchableOpacity>
        </AuthContainer>
      </ImageBackground>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 14,
    marginBottom: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
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

export default RegisterScreen;
