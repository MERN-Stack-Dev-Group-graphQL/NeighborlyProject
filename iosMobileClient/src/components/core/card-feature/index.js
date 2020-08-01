import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {currencyFormat} from '_utils/currencyFormat';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import StarCount from '_core/review/starcount';
import * as routes from '_utils/constants/routes';

const {width} = Dimensions.get('window');

const CardFeature = ({tool, navigation, handleCart, cartCount, y, index}) => {
  const {colors} = useTheme();
  const [buttonState, setButtonState] = useState(true);
  const ImageBlock = path => {
    if (path.url.length > 1) {
      return (
        <Image
          style={styles.toolImage}
          source={{
            uri: `${routes.LOCAL_HOST}${path.url}`,
          }}
        />
      );
    }
    return (
      <Image
        style={styles.toolImage}
        source={{
          uri: `${routes.LOCAL_HOST}}/assets/img/default.jpg`,
        }}
      />
    );
  };

  const starCount = 4;
  const rateCount = 252;
  const onPress = () => {
    navigation.push('Tool Details', {
      itemId: tool._id,
      tool: tool,
      starCount,
      rateCount,
    });
  };

  return (
    <Animated.View
      style={[
        styles.cardWrapper,
        {
          alignSelf: 'center',
          marginVertical: 10,
        },
      ]}
      key={index}>
      <TouchableOpacity style={{flex: 1}} onPress={onPress}>
        <View style={styles.cardImage}>
          <ImageBlock url={tool.url} />
          <LinearGradient
            colors={['transparent', colors.primary]}
            style={styles.linearGradient}
          />
        </View>

        <View style={styles.cardBody}>
          <View style={styles.avatarWrapper}>
            <Image
              style={styles.avatar}
              source={{
                uri: 'https://randomuser.me/api/portraits/men/1.jpg',
              }}
            />
          </View>
          <Text style={styles.cardTitle}>{tool.title}</Text>
          <View style={styles.starCountWrapper}>
            <StarCount starCount={starCount} rateCount={rateCount} />
          </View>
        </View>
        <View style={[styles.cardBase, {paddingHorizontal: 10}]}>
          <View style={styles.divider} />
          <View style={styles.cardFooter}>
            <View style={styles.priceUnitWrapper}>
              <Text style={styles.price}>{currencyFormat(tool.price)}</Text>
              <Text style={styles.unit}>{`/ per ${tool.unitOfMeasure}`}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: width / 2,
    marginRight: 10,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 16,
  },
  cardImage: {
    flex: 3,
    overflow: 'hidden',
    backgroundColor: 'gray',
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardBody: {
    flex: 1,
    position: 'relative',
    padding: 10,
  },
  cardBase: {
    flex: 1,
  },
  toolImage: {
    ...StyleSheet.absoluteFillObject,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    position: 'absolute',
    height: 30,
    width: 30,
    borderRadius: 25,
    top: -35,
    left: 0,
  },
  priceUnitWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 24,
    letterSpacing: -1,
    fontWeight: 'bold',
  },
  unit: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.5)',
    paddingLeft: 6,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    opacity: 0.25,
  },
});

export default CardFeature;
