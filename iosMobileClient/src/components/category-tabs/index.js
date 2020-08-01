import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {CATEGORIES} from '_utils/graphql/mock';
import {useTheme} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CategoryTabs = () => {
  const {colors} = useTheme();

  return (
    <View style={styles.categoryScrollView}>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}>
        <TouchableOpacity
          style={[styles.toolsMakeIcon, {backgroundColor: colors.secondary}]}
          onPress={() => navigation.navigate('Alert')}>
          <Text style={{color: '#ffffff'}}>Category</Text>
          <MaterialCommunityIcons
            name="arrow-down-drop-circle-outline"
            color={'#ffffff'}
            size={20}
            style={{marginLeft: 6}}
          />
        </TouchableOpacity>
        {CATEGORIES.map((category, index) => (
          <TouchableOpacity key={index} style={styles.toolsMakeIcon}>
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryScrollView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  categoryScroll: {
    paddingVertical: 10,
  },
  toolsMakeIcon: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 16,
    marginHorizontal: 6,
    height: 35,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 10,
  },
});

export default CategoryTabs;
