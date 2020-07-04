import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styled from 'styled-components';

const SplashScreen = props => {
  let [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('user_id').then(value =>
        props.navigation.navigate(
          value === null ? 'Auth' : 'DrawerNavigationRoutes',
        ),
      );
    }, 5000);
  }, [props.navigation]);

  return (
    <SplashContainer>
      <ImageWrapper source={require('../assets/images/brand-logo.png')} />
      <ActivityContainer animating={animating} color="#FFFFFF" size="large" />
    </SplashContainer>
  );
};
export default SplashScreen;

const SplashContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #307ecc;
`;

const ImageWrapper = styled.Image`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActivityContainer = styled.ActivityIndicator`
  align-items: center;
  height: 80;
`;
