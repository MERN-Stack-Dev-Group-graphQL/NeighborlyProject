import React, {useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SEARCH_TOOLS_QUERY} from '_utils/graphql';
import {LOCAL_HOST_SERVER} from 'react-native-dotenv';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

const Header = ({title, navigation}) => {
  const [search, setSearch] = useState('');

  const ImageBlock = path => {
    if (path.url.length > 1) {
      return (
        <CardImage
          source={{
            uri: `${LOCAL_HOST_SERVER}${path.url}`,
          }}
        />
      );
    }
    return (
      <CardImage
        source={{
          uri: `${LOCAL_HOST_SERVER}/assets/img/default.jpg`,
        }}
      />
    );
  };

  const {data} = useQuery(SEARCH_TOOLS_QUERY, {
    variables: {search: search},
  });

  if (data) {
    var tools = data;
  }

  const starCount = 4;
  const rateCount = 252;

  return (
    <SearchContainer>
      <SearchFormWrapper>
        <View style={{position: 'absolute', zIndex: 999, left: 16}}>
          <MaterialCommunityIcons
            name="search-web"
            color={'rgba(0,0,0,0.25)'}
            size={30}
          />
        </View>
        <FormControlTextInput
          label="Search"
          placeholder="Search"
          onChangeText={search => setSearch(search)}
          defaultValue={search}
        />
      </SearchFormWrapper>

      {tools && search !== '' && (
        <ScrollView style={styles.searchWrapper}>
          <AutoComplete>
            {tools &&
              tools.searchTools.map((tool, index) => (
                <TouchableOpacity key={index}>
                  <SearchResultsTap
                    onPress={() => {
                      navigation.push('Tool Details', {
                        itemId: tool._id,
                        tool: tool,
                        starCount,
                        rateCount,
                        otherParam: 'anything you want here',
                      });
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <ImageBlock url={tool.url} />
                      <ResultsText>
                        <Text>{tool.make}:</Text> <Text>{tool.title}</Text>
                      </ResultsText>
                    </View>
                  </SearchResultsTap>
                </TouchableOpacity>
              ))}
          </AutoComplete>
        </ScrollView>
      )}
    </SearchContainer>
  );
};

const styles = StyleSheet.create({
  searchWrapper: {
    position: 'absolute',
    marginHorizontal: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    borderColor: '#f6f6f6',
    borderWidth: 0.5,
    width: '100%',
    top: Platform === 'ios' ? 80 : 65,
    zIndex: 3,
  },
});

Header.defaultProps = {
  title: 'Neighborly',
};

const AutoComplete = styled.View`
  position: relative;
  border-radius: 5px;
`;

const CardImage = styled.Image`
  height: 50px;
  width: 50px;
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
  padding-left: 10px;
`;

const SearchContainer = styled.View`
  position: relative;
  padding-left: 16px;
  padding-right: 16px;
  background-color: rgba(16, 43, 70, 1);
  z-index: 2;
`;

const SearchFormWrapper = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 70px;
`;

const FormControlTextInput = styled.TextInput`
  width: 100%;
  height: 50px;
  padding: 10px 25px 10px 48px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 1);
  margin: 16px;
`;

export default Header;
