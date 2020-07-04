import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';

const Header = ({title}) => {
  return (
    <HeaderWrapper>
      <TextWrapper>{title}</TextWrapper>
    </HeaderWrapper>
  );
};

Header.defaultProps = {
  title: 'Neighborly',
};

export default Header;

const HeaderWrapper = styled.View`
  height: 60px;
  padding: 15px;
  background-color: rgba(16, 43, 70, 1);
`;

const TextWrapper = styled.Text`
  color: rgba(255, 255, 255, 1);
  font-size: 24px;
  text-align: center;
`;
