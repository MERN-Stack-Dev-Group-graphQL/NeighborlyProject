import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {SEARCH_TOOLS_QUERY} from '_utils/graphql';
import {CardImage} from '_core/card/card-image';
import {useTheme} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');
const SearchBar = ({title, navigation}) => {
  const {colors} = useTheme();
  const [search, setSearch] = useState('');
  const {data} = useQuery(SEARCH_TOOLS_QUERY, {
    variables: {search: search},
  });

  const handleFilter = () => {
    setSearch('');
  };

  if (data) {
    var tools = data;
  }

  const starCount = 4;
  const rateCount = 252;

  return (
    <View
      style={[styles.searchBarContainer, {backgroundColor: colors.primary}]}>
      <View style={styles.searchFormWrapper}>
        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: search ? colors.white : colors.whiteOpaqueHigh,
            },
          ]}>
          <View style={styles.searchIcon}>
            <MaterialCommunityIcons
              name="search-web"
              color={colors.primaryDarkOpaque}
              size={24}
            />
          </View>
          <TextInput
            style={styles.formControl}
            label="Search"
            placeholder="Search"
            onChangeText={search => setSearch(search)}
            keyboardType={Platform.OS == 'ios' ? 'web-search' : 'default'}
            returnKeyLabel={'search'}
            defaultValue={search}
          />

          <TouchableOpacity style={styles.filterIcon} onPress={handleFilter}>
            <MaterialCommunityIcons
              name="close"
              color={search !== '' ? colors.primary : colors.primaryDarkOpaque}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            navigation.navigate('Alert');
          }}>
          <Text style={{color: colors.white}}>Filter</Text>
        </TouchableOpacity>
      </View>

      {tools && search !== '' && (
        <ScrollView
          style={[
            styles.searchWrapper,
            {
              backgroundColor: colors.white,
              borderColor: colors.background,
            },
          ]}>
          <View style={styles.autoCompleteContainer}>
            {tools &&
              tools.searchTools.map((tool, index) => (
                <TouchableOpacity key={index}>
                  <TouchableOpacity
                    style={styles.tapSearchResults}
                    onPress={() => {
                      navigation.push('Tool Details', {
                        itemId: tool._id,
                        tool: tool,
                        starCount,
                        rateCount,
                      });
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: colors.grayLight,
                        borderStyle: 'solid',
                      }}>
                      <CardImage
                        path={tool.url}
                        style={{
                          position: 'relative',
                          height: 50,
                          width: 50,
                          borderRadius: 25,
                          borderWidth: 3,
                          borderColor: colors.blackOpaqueLow,
                          marginBottom: 4,
                        }}
                      />
                      <View style={styles.resultsView}>
                        <View style={styles.searchListText}>
                          <Text style={styles.textBold}>{tool.title}</Text>
                        </View>
                        <View style={styles.searchListText}>
                          <Text
                            style={[
                              styles.textLight,
                              {color: colors.blackOpaque},
                            ]}>
                            {tool.make}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

SearchBar.defaultProps = {
  title: 'Neighborly',
};

const styles = StyleSheet.create({
  searchBarContainer: {
    position: 'relative',
    zIndex: 2,
  },
  searchWrapper: {
    position: 'absolute',
    borderRadius: 6,
    borderWidth: 0.5,
    width: '100%',
    top: Platform === 'ios' ? 80 : 65,
    zIndex: 3,
  },
  searchFormWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width,
  },
  searchContainer: {
    flex: 6,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    marginLeft: 16,
  },
  filterButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
  formControl: {
    flex: 1,
    padding: 0,
  },
  filterIcon: {
    marginRight: 10,
  },
  textBold: {
    fontWeight: 'bold',
    minWidth: 52,
  },
  textLight: {
    fontSize: 13,
  },
  searchListText: {
    flexDirection: 'row',
  },
  autoCompleteContainer: {
    position: 'relative',
    borderRadius: 5,
  },
  resultsView: {
    paddingLeft: 8,
  },
  tapSearchResults: {
    position: 'relative',
    textAlign: 'left',
    padding: 10,
    width: '100%',
  },
});

export default SearchBar;
