import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {SEARCH_CATEGORIES} from '_utils/graphql/mock';
import SafeAreaView from 'react-native-safe-area-view';
import SearchBar from '_components/searchbar';
import Divider from '_core/divider';
import Pill from '_core/pill';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');
const WIDTH = width - 32;

const Search = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <SearchBar navigation={navigation} />

      <View style={styles.container}>
        <ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          style={styles.actionBar}>
          {SEARCH_CATEGORIES.map((tab, index) => (
            <Pill {...tab} key={index} />
          ))}
        </ScrollView>
        <View
          style={[
            styles.searchWordContainer,
            {backgroundColor: colors.primaryLight},
          ]}>
          <Text style={[styles.searchWord, {color: colors.white}]}>
            "Search word"
          </Text>
          <MaterialCommunityIcons
            name="close-circle"
            size={16}
            style={{color: colors.white, marginLeft: 10}}
          />
        </View>
        <Divider />
        <Text style={{color: colors.blackOpaque}}>All Tools (154)</Text>
        <View style={{flex: 1}}>
          <View style={styles.alignContent}>
            <Text>Search Page</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    width: WIDTH,
    alignSelf: 'center',
  },
  actionBar: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginVertical: 10,
  },
  searchWordContainer: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 10,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    marginRight: 'auto',
  },
  searchWord: {
    fontSize: 12,
  },
  alignContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

export default Search;
