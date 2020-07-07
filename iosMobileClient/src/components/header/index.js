import React, {useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {Text, TextInput, View} from 'react-native';
import {SEARCH_TOOLS_QUERY} from '_utils/graphql';
// import {useForm} from '_utils/hooks';
import Icon from 'react-native-vector-icons/dist/Feather';
import styled from 'styled-components';

Icon.loadFont();

const Header = ({title, navigation}) => {
  const [search, setSearch] = useState('');

  const {data} = useQuery(SEARCH_TOOLS_QUERY, {
    variables: {search: search},
  });

  if (data) {
    var tools = data;
  }

  const starCount = 4;
  const rateCount = 252;

  const handleOnPress = tool => {
    navigation.push('Tool Details', {
      itemId: tool._id,
      tool: tool,
      starCount,
      rateCount,
      otherParam: 'anything you want here',
    });
  };

  return (
    <SearchContainer>
      <SearchFormWrapper>
        <FormControlTextInput
          label="Search"
          placeholder="Search"
          onChangeText={search => setSearch(search)}
          defaultValue={search}
        />
      </SearchFormWrapper>

      {tools ? (
        <AutoCompleteWrapper>
          <AutoComplete>
            {tools &&
              tools.searchTools.map((tool, index) => (
                <View key={index}>
                  <SearchResultsTap>
                    <ResultsText>
                      <Text>{tool.make}:</Text> <Text>{tool.title}</Text>
                    </ResultsText>
                  </SearchResultsTap>
                </View>
              ))}
          </AutoComplete>
        </AutoCompleteWrapper>
      ) : (
        <Text />
      )}
    </SearchContainer>
  );
};

const AutoCompleteWrapper = styled.View`
  position: relative;
  z-index: 999;
`;

const AutoComplete = styled.View`
  position: relative;
  border-radius: 5px;
  background: #ffffff;
`;

const SearchResultsTap = styled.TouchableOpacity`
  position: relative;
  text-align: left;
  padding: 10px;
  width: 100%;
`;

const ResultsText = styled.Text`
  font-size: 16px;
  letter-spacing: 1px;
`;

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
