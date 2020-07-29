import React from 'react';
import {Text, View, FlatList, StyleSheet, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Divider from '_core/divider';
import {CATEGORIES} from '_utils/graphql/mock';

const styles = StyleSheet.create({
  categoryItem: {
    paddingVertical: 10,
  },
  categoryName: {
    fontSize: 16,
  },
});

const Category = ({name, icon}) => (
  <View style={styles.categoryItem}>
    <Text style={styles.categoryName}>{name}</Text>
  </View>
);

const ToolCategory = () => {
  const renderItem = ({item}) => <Category name={item.name} />;

  return (
    <View>
      <View>
        <Text style={{fontSize: 16, fontWeight: '600', textAlign: 'center'}}>
          Categories
        </Text>
      </View>
      <Divider />
      <ScrollView>
        {CATEGORIES.map(category => (
          <View
            key={category.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
            }}>
            <View style={{marginRight: 6, paddingBottom: 6}}>
              <MaterialCommunityIcons
                name={category.icon}
                color={'#1B2023'}
                size={20}
              />
            </View>
            <View>
              <Text>{category.name}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ToolCategory;
