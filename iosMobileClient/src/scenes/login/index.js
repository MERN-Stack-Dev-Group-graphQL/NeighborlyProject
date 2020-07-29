import React, {useState, useContext} from 'react';
import {useMutation} from '@apollo/client';
import {
  StatusBar,
  Image,
  ImageBackground,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {AuthContext} from '_utils/context/';
import {AppButton, AppButtonOutline} from '_core/button';
import {Formik} from 'formik';
import AuthContainer from '_components/auth-container';
import DismissKeyboard from '_core/dismiss-keyboard';
import SocialLogin from '_components/social-login';
import TextInput from '_components/form/text-input';
import CheckBox from '_components/form/checkbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import * as Yup from 'yup';

import {BG_IMAGE, BRAND_LOGO, BRAND_LOGO_NAME} from '_assets';
import {LOGIN_USER} from '_utils/graphql';

const styles = StyleSheet.create({
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
  errorMessage: {
    color: 'rgba(255, 194, 11, 1)',
    paddingHorizontal: 10,
    marginBottom: 20,
    maxWidth: 320,
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

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const LoginScreen = ({navigation}) => {
  const {loginUser} = useContext(AuthContext);
  const [userData, setUserData] = useState({
    login: '',
    password: '',
    secureTextEntry: true,
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
    variables: userData,
  });

  const loginHandle = (login, password) => {
    setUserData({
      ...userData,
      login,
      password,
    });
    getUser(login, password);
  };

  return (
    <ImageBackground source={BG_IMAGE} style={styles.backgroundImage}>
      <DismissKeyboard>
        <AuthContainer>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />

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
            validationSchema={LoginSchema}
            initialValues={{email: '', password: '', remember: false}}
            onSubmit={values => loginHandle(values.email, values.password)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <View style={{width: '100%', alignItems: 'center'}}>
                <TextInput
                  iconError="email-outline"
                  iconValid="email-outline"
                  placeholder="Enter your Email"
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
                  placeholder="Enter your Password"
                  secureTextEntry={userData.secureTextEntry ? true : false}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  autoCapitalize="none"
                  error={errors.password}
                  touched={touched.password}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    maxWidth: 300,
                    marginBottom: 30,
                  }}>
                  <CheckBox
                    label="Remember me"
                    checked={values.remember}
                    onChange={() => setFieldValue('remember', !values.remember)}
                  />

                  <TouchableHighlight
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    <View style={styles.forgotPassword}>
                      <Text style={styles.buttonText}>Forgot password?</Text>
                    </View>
                  </TouchableHighlight>
                </View>

                <AppButton title="Login" size="sm" onPress={handleSubmit} />
              </View>
            )}
          </Formik>

          <AppButtonOutline
            title="Register"
            size="sm"
            onPress={() => navigation.navigate('Register')}
          />

          <SocialLogin />

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
      </DismissKeyboard>
    </ImageBackground>
  );
};

export default LoginScreen;
