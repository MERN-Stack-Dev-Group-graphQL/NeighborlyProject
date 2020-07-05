import React, {Fragment, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import styled from 'styled-components';

Icon.loadFont();

const Header = ({title, navigation}) => {
  const [search, setSearch] = useState('');

  return (
    <Fragment>
      <SearchWrapper>
        <FormControlTextInput
          label="Search"
          placeholder="Search"
          name="search"
          style={styles.formControl}
          onChangeText={() => {}}
          defaultValue={search}
        />
      </SearchWrapper>
    </Fragment>
  );
};

Header.defaultProps = {
  title: 'Neighborly',
};

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

const SearchWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 90px;
  background-color: rgba(16, 43, 70, 1);
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
