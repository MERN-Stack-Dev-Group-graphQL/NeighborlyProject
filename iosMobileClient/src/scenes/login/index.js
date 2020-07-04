import React, {useState} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  Alert,
  TextInput,
  TouchableHighlight,
  Button,
  View,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Loader from '../../components/core/loader';
import {AppButton} from '_components/core/button';
import styled from 'styled-components';

const LoginScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const handleSubmit = () => {
    // setErrortext('');
    // if (!login) {
    //   Alert.alert('Please enter your username or email');
    //   return;
    // }
    // if (!password) {
    //   Alert.alert('Please enter your password');
    //   return;
    // }
    // setLoading(true);

    Alert.alert('Login Button Clicked!');
    navigation.navigate('Home');
  };

  return (
    <LoginContainer style={styles.container}>
      <Loader loading={loading} />
      <ImageWrapper source={require('../../assets/images/brand-logo.png')} />
      <ImageWrapper
        style={{marginBottom: 40}}
        source={require('../../assets/images/brand-text.png')}
      />
      <FormControlTextInput
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
      <FormControlTextInput
        label="Password"
        placeholder="Password"
        name="password"
        secureTextEntry={true}
        style={styles.formControl}
        onChangeText={() => {
          setPassword(password);
        }}
        defaultValue={password}
      />
      <AppButton title="Login" size="sm" onPress={handleSubmit} />

      <TouchableHighlight onPress={() => navigation.navigate('ForgotPassword')}>
        <ForgotPasswordWrapper>
          <ButtonText>Forgot password?</ButtonText>
        </ForgotPasswordWrapper>
      </TouchableHighlight>

      <AuthSocialWrapper>
        <ImageIcon source={require('../../assets/images/auth-google.png')} />
        <ImageIcon source={require('../../assets/images/auth-facebook.png')} />
        <ImageIcon source={require('../../assets/images/auth-apple.png')} />
      </AuthSocialWrapper>

      <TouchableHighlight onPress={() => navigation.navigate('Register')}>
        <Paragraph>
          You don’t have an account? <Text style={styles.label}>Register</Text>{' '}
          here.
        </Paragraph>
      </TouchableHighlight>
    </LoginContainer>
  );
};

export default LoginScreen;

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
});

const LoginContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(16, 43, 70, 1);
  height: 100%;
`;

const FormControlTextInput = styled.TextInput`
  width: 100%;
  max-width: 320px;
  height: 50px;
  padding: 10px;
  padding-left: 25px;
  padding-right: 25px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 1);
  margin-bottom: 16px;
`;

const ImageWrapper = styled.Image`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const ForgotPasswordWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  margin-bottom: 30px;
`;

const AuthSocialWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;

const ImageIcon = styled.Image`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-horizontal: 8px;
`;

const Paragraph = styled.Text`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 10px;
`;

const ButtonText = styled.Text`
  color: rgba(255, 255, 255, 0.85);
`;

const ActivityContainer = styled.ActivityIndicator`
  align-items: center;
  height: 80px;
`;
