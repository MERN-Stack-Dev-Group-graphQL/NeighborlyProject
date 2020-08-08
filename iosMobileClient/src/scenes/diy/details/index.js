import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import FeaturedTools from '_scenes/tools/featured';
import LinearGradient from 'react-native-linear-gradient';
import Divider from '_core/divider';
import Video from 'react-native-video';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');
const ratio = 1080 / 1920;
const VIDEO_WIDTH = width;
const VIDEO_HEIGHT = VIDEO_WIDTH * ratio;
const WIDTH = width - 40;

const DIYDetails = ({route, navigation}) => {
  const {colors} = useTheme();
  const {itemId, video} = route.params;

  return (
    <FlatList
      scrollEventThrottle={1}
      showsHorizontalScrollIndicator={false}
      data={[{video}]}
      renderItem={({index, item}) => (
        <View style={styles.container} key={index}>
          <View style={styles.videoPlayer}>
            <Video
              controls
              paused
              resizeMode={'cover'}
              source={video.videoUrl}
              style={styles.backgroundVideo}
            />

            <LinearGradient
              colors={['transparent', colors.primary]}
              style={styles.linearGradient}
            />
          </View>
          <View style={styles.featuredContent}>
            <Text style={styles.header}>{video.title}</Text>
            <View style={styles.timeDateBar}>
              <Text style={[styles.textMuted, {color: colors.blackOpaque}]}>
                Jul 14, 2020
              </Text>
              <Text style={[styles.textMuted, {color: colors.blackOpaque}]}>
                9:40
              </Text>
            </View>
            <Divider style={{marginTop: 0}} />
            <View style={styles.actionBar}>
              <TouchableOpacity style={styles.saveIcon}>
                <MaterialCommunityIcons
                  name="bookmark-outline"
                  size={24}
                  style={{color: colors.black}}
                />
                <Text style={{color: colors.text}}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.commentIcon}>
                <MaterialCommunityIcons
                  name="comment-outline"
                  size={24}
                  style={{color: colors.black}}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareIcon}>
                <MaterialCommunityIcons
                  name="share-outline"
                  size={24}
                  style={{color: colors.black}}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.description}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem
              quis odio distinctio eius asperiores maiores harum..
            </Text>
            <View style={styles.recommendedVideo} />
            <View style={styles.commentsContainer}>
              <Text
                style={[
                  [styles.textMuted, {color: colors.blackOpaque}],
                  {marginBottom: 5},
                ]}>
                12 Comments
              </Text>
              <View style={styles.comments}>
                <Text
                  numberOfLines={2}
                  style={[styles.comment, {fontWeight: 'bold'}]}>
                  Jason Bourne{' '}
                  <Text
                    style={[styles.content, {color: colors.blackOpaqueHigh}]}>
                    Absolutely loved this video and John's work!!! Very solid!
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.recommendedVideoContent}>
            <Text style={[styles.header, {textAlign: 'left', fontSize: 20}]}>
              Recommended For You
            </Text>
            <Divider />
          </View>
        </View>
      )}
      ListFooterComponent={() => <FeaturedTools navigation={navigation} />}
      keyExtractor={item => item.video._id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    alignSelf: 'center',
  },
  videoPlayer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: VIDEO_HEIGHT,
    width,
    marginBottom: 10,
  },
  backgroundVideo: {
    position: 'absolute',
    aspectRatio: 1,
    flex: 1,
    width,
    height: '100%',
    zIndex: 2,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    opacity: 0.25,
  },
  playerControl: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: WIDTH,
    maxWidth: 400,
  },
  featuredContent: {
    width: WIDTH,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  timeDateBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textMuted: {
    fontSize: 12,
  },
  actionBar: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  saveIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  shareIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  commentsContainer: {
    marginBottom: 10,
    width: WIDTH,
    alignSelf: 'center',
  },
  comments: {
    flexDirection: 'row',
    width: WIDTH,
  },
  comment: {},
  content: {
    fontWeight: 'normal',
  },
  description: {
    paddingBottom: 10,
  },
  recommendedVideoContent: {
    width: WIDTH,
    alignSelf: 'center',
  },
  recommendedToolContent: {},
});

export default DIYDetails;
