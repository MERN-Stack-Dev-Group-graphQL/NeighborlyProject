import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components';

TouchableOpacity.defaultProps = {activeOpacity: 0.8};

export const AppButton = ({onPress, title}) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity`
  elevation: 8;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 320px;
  height: 50px;
  line-height: 50px;
  border-radius: 25px;
  background-color: rgba(255, 194, 11, 1);
  text-transform: uppercase;
  margin-bottom: 16px;
  padding-vertical: 10px;
  padding-horizontal: 12px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: 'rgba(16, 43, 70, 1)';
  align-self: center;
  text-transform: uppercase;
`;
