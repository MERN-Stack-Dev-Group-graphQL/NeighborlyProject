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

const RegisterScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const handleSubmit = () => {
    setErrortext('');
    if (!firstName) {
      alert('Please enter your first name');
      return;
    }
    if (!lastName) {
      alert('Please enter your last name');
      return;
    }
    if (!password) {
      alert('Enter a password');
      return;
    }
    if (!confirmPassword) {
      alert('Confirm your password');
      return;
    }
    setLoading(true);

    Alert.alert(
      'Registration Info',
      `${firstName} + ${lastName} + ${password}`,
    );
  };

  return (
    <RegisterContainer style={styles.container}>
      <Loader loading={loading} />
      <ImageWrapper source={require('../../assets/images/brand-logo.png')} />
      <ImageWrapper
        style={{marginBottom: 40}}
        source={require('../../assets/images/brand-text.png')}
      />
      <FormControlTextInput
        label="FirstName"
        placeholder="First Name"
        name="firstName"
        style={styles.formControl}
        onChangeText={() => {
          setFirstName(firstName);
        }}
        defaultValue={firstName}
      />
      <FormControlTextInput
        label="LastName"
        placeholder="Last Name"
        name="lastName"
        style={styles.formControl}
        onChangeText={() => {
          setLastName(lastName);
        }}
        defaultValue={lastName}
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
      <FormControlTextInput
        label="ConfirmPassword"
        placeholder="Confirm Password"
        name="confirmPassword"
        secureTextEntry={true}
        style={styles.formControl}
        onChangeText={() => {
          setConfirmPassword(confirmPassword);
        }}
        defaultValue={confirmPassword}
      />
      <AppButton title="Register" size="sm" onPress={handleSubmit} />
      <TouchableHighlight onPress={() => navigation.navigate('Login')}>
        <Paragraph>
          Already have an account? <Text style={styles.label}>Login</Text> here.
        </Paragraph>
      </TouchableHighlight>
    </RegisterContainer>
  );
};

export default RegisterScreen;

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

const RegisterContainer = styled.View`
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

const Paragraph = styled.Text`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 10px;
`;

const ActivityContainer = styled.ActivityIndicator`
  align-items: center;
  height: 80px;
`;
