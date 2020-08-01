import React from 'react';
import {Text, View, StyleSheet, FlatList, Dimensions} from 'react-native';
import Divider from '_core/divider';
import FeaturedTools from '_scenes/tools/featured';

const {width, height} = Dimensions.get('window');
const HEIGHT = height / 3;
const WIDTH = width - 40;

const DIYDetails = ({route, navigation}) => {
  const {itemId, video} = route.params;

  console.log('ID', video._id);
  return (
    <FlatList
      ListFooterComponent={() => <FeaturedTools navigation={navigation} />}
      data={[{video}]}
      renderItem={({index, item}) => (
        <View style={styles.container} key={index}>
          <View style={styles.featuredContent}>
            <Text style={styles.header}>{video.title}</Text>
            <View style={styles.video} />
            <Text style={styles.description}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem
              quis odio distinctio eius asperiores maiores harum..
            </Text>
            <View style={styles.recommendedVideo} />
          </View>
          <View style={styles.recommendedVideoContent}>
            <Text style={[styles.header, {textAlign: 'left', fontSize: 24}]}>
              Recommended For You
            </Text>
            <Divider />
          </View>
        </View>
      )}
      keyExtractor={item => item.video._id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    alignSelf: 'center',
  },
  featuredContent: {},
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  video: {
    height: HEIGHT,
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom: 20,
  },
  description: {
    paddingBottom: 10,
  },
  recommendedVideoContent: {},
  recommendedToolContent: {},
});

export default DIYDetails;
