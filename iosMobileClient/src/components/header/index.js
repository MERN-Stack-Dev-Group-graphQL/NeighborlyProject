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
  Alert,
} from 'react-native';
import {SEARCH_TOOLS_QUERY} from '_utils/graphql';
import * as routes from '_utils/constants/routes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  searchBarContainer: {
    position: 'relative',
    backgroundColor: '#003167',
    zIndex: 2,
  },
  searchWrapper: {
    position: 'absolute',
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    borderColor: '#f6f6f6',
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
    height: 70,
    width,
  },
  searchContainer: {
    flex: 6,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    marginLeft: 10,
  },
  filterButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  filter: {
    color: '#ffffff',
  },
  searchIcon: {
    marginLeft: 16,
  },
  formControl: {
    flex: 1,
    padding: 0,
  },
  filterIcon: {
    marginRight: 16,
  },

  textBold: {
    fontWeight: 'bold',
    minWidth: 52,
  },
  textLight: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 13,
  },
  searchListText: {
    flexDirection: 'row',
  },

  autoCompleteContainer: {
    position: 'relative',
    borderRadius: 5,
  },
  cardImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#d0d4d5',
    marginBottom: 4,
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

const Header = ({title, navigation}) => {
  const [search, setSearch] = useState('');

  const ImageBlock = path => {
    if (path.url.length > 1) {
      return (
        <Image
          style={styles.cardImage}
          source={{
            uri: `${routes.LOCAL_HOST}${path.url}`,
          }}
        />
      );
    }
    return (
      <Image
        style={styles.cardImage}
        source={{
          uri: `${routes.LOCAL_HOST}/assets/img/default.jpg`,
        }}
      />
    );
  };

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
    <View style={styles.searchBarContainer}>
      <View style={styles.searchFormWrapper}>
        <View style={styles.searchContainer}>
          <View style={styles.searchIcon}>
            <MaterialCommunityIcons
              name="search-web"
              color={'rgba(16, 43, 70, 0.25)'}
              size={30}
            />
          </View>
          <TextInput
            style={styles.formControl}
            label="Search"
            placeholder="Search"
            onChangeText={search => setSearch(search)}
            defaultValue={search}
          />

          <TouchableOpacity style={styles.filterIcon} onPress={handleFilter}>
            <MaterialCommunityIcons
              name="close"
              color={search !== '' ? '#003167' : 'rgba(16, 43, 70, 0.25)'}
              size={24}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            navigation.navigate('Alert');
          }}>
          <Text style={styles.filter}>Filter</Text>
        </TouchableOpacity>
      </View>

      {tools && search !== '' && (
        <ScrollView style={styles.searchWrapper}>
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
                        borderBottomColor: 'rgba(0,0,0,0.075)',
                        borderStyle: 'solid',
                      }}>
                      <ImageBlock url={tool.url} />
                      <View style={styles.resultsView}>
                        <View style={styles.searchListText}>
                          <Text style={styles.textBold}>{tool.title}</Text>
                        </View>
                        <View style={styles.searchListText}>
                          <Text style={styles.textLight}>{tool.make}</Text>
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

Header.defaultProps = {
  title: 'Neighborly',
};

export default Header;
