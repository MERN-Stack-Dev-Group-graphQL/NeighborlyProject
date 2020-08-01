import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {currencyFormat} from '_utils/currencyFormat';
import StarCount from '_core/review/starcount';
import LinearGradient from 'react-native-linear-gradient';
import * as routes from '_utils/constants/routes';

TouchableOpacity.defaultProps = {activeOpacity: 0.8};

const CardList = ({tool, navigation, handleCart, cartCount}) => {
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
          uri: `${routes.LOCAL_HOST}${path.url}`,
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
      otherParam: 'anything you want here',
    });
  };

  const handleAddToCart = () => {
    if (buttonState) {
      setButtonState(false);
      handleCart();
    }
  };

  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <View style={styles.cardBody}>
          <View style={[styles.cardImage, {flex: 1}]}>
            <ImageBlock url={tool.url} />
            <LinearGradient
              colors={['transparent', '#003167']}
              style={styles.linearGradient}
            />
            <Image
              style={styles.avatar}
              source={{
                uri: 'https://randomuser.me/api/portraits/men/1.jpg',
              }}
            />
          </View>
          <View style={{paddingHorizontal: 10, flex: 2}}>
            <View style={styles.header}>
              <Text style={styles.subHeading}>{tool.make}</Text>
              <Text style={styles.cardTitle}>{tool.title}</Text>
              <View style={styles.starCountWrapper}>
                <StarCount starCount={starCount} rateCount={rateCount} />
              </View>
            </View>
            <View style={styles.actionWrapper}>
              <View style={styles.priceUnitWrapper}>
                <Text style={styles.price}>{currencyFormat(tool.price)}</Text>
                <Text style={styles.unit}>{`/ per ${tool.unitOfMeasure}`}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: '#ffffff',
    margin: 10,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 12,
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cardImage: {
    backgroundColor: 'gray',
    minHeight: 120,
  },
  cardTitle: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 55,
    marginBottom: 4,
  },
  toolImage: {
    ...StyleSheet.absoluteFillObject,
  },
  avatar: {
    position: 'absolute',
    height: 40,
    width: 40,
    borderRadius: 20,
    transform: [{translateY: -8}],
    left: -8,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  header: {
    flexDirection: 'column',
  },
  subHeading: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.5)',
  },
  priceUnitWrapper: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  unit: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.5)',
    paddingLeft: 6,
  },
  buttonContainer: {
    elevation: 8,
    display: 'flex',
    width: '100%',
  },
  starCountWrapper: {
    marginBottom: 8,
  },
  actionWrapper: {
    marginTop: 'auto',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    opacity: 0.25,
  },
});

export default CardList;
