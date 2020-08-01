import React, {useState, useContext} from 'react';
import {useMutation} from '@apollo/client';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {AppButton} from '_components/core/button';
import {AuthContext} from '_utils/context/';
import {Formik} from 'formik';
import TextInput from '_components/form/text-input';
import Loader from '_core/loader';
import DismissKeyboard from '_core/dismiss-keyboard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Yup from 'yup';
import {BG_IMAGE} from '_assets';
import {RESET_PASSWORD} from '_utils/graphql';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const ForgotPasswordScreen = ({navigation}) => {
  const {resetUserPassord} = useContext(AuthContext);
  const [userData, setUserData] = useState({
    email: '',
  });

  const [resetPassword, {loading}] = useMutation(RESET_PASSWORD, {
    update(
      __,
      {
        data: {email: userData},
      },
    ) {
      resetUserPassord(userData);
    },
    variables: userData,
  });

  const passwordHandle = email => {
    setUserData({
      ...userData,
      email,
    });
    resetPassword(email);
  };

  const handleOnPressRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <DismissKeyboard>
      <ImageBackground source={BG_IMAGE} style={styles.backgroundImage}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#003167" />
          <Loader loading={loading} />

          <Formik
            validationSchema={ForgotPasswordSchema}
            initialValues={{email: ''}}
            onSubmit={values => passwordHandle(values.email)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <View style={{width: '100%', maxWidth: 320}}>
                <Text style={styles.header}>Forgot password?</Text>

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
                <AppButton title="Reset" size="sm" onPress={handleSubmit} />

                <TouchableHighlight onPress={handleOnPressRegister}>
                  <Text style={styles.paragraph}>
                    <Text>You don’t have an account? </Text>
                    <Text style={styles.span}>Register</Text> here.
                  </Text>
                </TouchableHighlight>
              </View>
            )}
          </Formik>

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

export default ForgotPasswordScreen;
