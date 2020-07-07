import React, {Fragment, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import styled from 'styled-components';

Icon.loadFont();

const Header = ({title}) => {
  const [search, setSearch] = useState('');

  return (
    <SearchContainer>
      <SearchFormWrapper>
        <FormControlTextInput
          label="Search"
          placeholder="Search"
          name="search"
          onChangeText={() => {}}
          defaultValue={search}
        />
      </SearchFormWrapper>
    </SearchContainer>
  );
};

Header.defaultProps = {
  title: 'Neighborly',
};

const SearchContainer = styled.View`
  padding-left: 16px;
  padding-right: 16px;
  background-color: rgba(16, 43, 70, 1);
`;

const SearchFormWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 90px;
`;

const FormControlTextInput = styled.TextInput`
  width: 100%;
  max-width: 380px;
  height: 50px;
  padding: 10px 25px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 1);
  margin: 16px;
`;

export default Header;
