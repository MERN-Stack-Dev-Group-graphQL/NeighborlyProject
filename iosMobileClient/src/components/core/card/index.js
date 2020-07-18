import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {currencyFormat} from '_utils/currencyFormat';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StarCount from '_core/review/starcount';
import {styles} from '_core/card/card.component.styles';
import * as routes from '_utils/constants/routes';

TouchableOpacity.defaultProps = {activeOpacity: 0.8};

const Card = ({tool, navigation, handleCart, cartCount}) => {
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
      otherParam: 'anything you want here',
    });
  };

  const handleSaveTool = () => {
    Alert.alert('Save tool pressed!');
  };

  const handleAddToCart = () => {
    if (buttonState) {
      setButtonState(false);
      handleCart();
    }
  };

  return (
    <View style={styles.cardWrapper}>
      <View>
        <View style={styles.cardImage}>
          <ImageBlock url={tool.url} />
          <LinearGradient
            colors={['transparent', '#003167']}
            style={styles.linearGradient}
          />
          <View style={styles.actionWrapper}>
            <TouchableOpacity style={styles.saveTool} onPress={handleSaveTool}>
              <MaterialCommunityIcons
                name="bookmark-outline"
                color={'#003167'}
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addToCart}
              onPress={handleAddToCart}>
              <MaterialCommunityIcons
                name="cart-plus"
                color={'#003167'}
                size={20}
              />
            </TouchableOpacity>
          </View>
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
        <View style={{paddingHorizontal: 10}}>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.05)',
            }}
          />
          <View style={styles.cardFooter}>
            <View style={styles.priceUnitWrapper}>
              <Text style={styles.price}>{currencyFormat(tool.price)}</Text>
              <Text style={styles.unit}>{`/ per ${tool.unitOfMeasure}`}</Text>
            </View>
            <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}>
              <Text style={styles.buttonText}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;
