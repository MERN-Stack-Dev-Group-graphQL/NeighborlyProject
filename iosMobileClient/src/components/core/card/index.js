import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {currencyFormat} from '_utils/currencyFormat';
import {useTheme} from '@react-navigation/native';
import {CardImage} from '_core/card/card-image';
import {
  styles,
  CARD_HEIGHT as DEFAULT_CARD_HEIGHT,
} from '_core/card/card.component.styles';
import StarCount from '_core/review/starcount';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

TouchableOpacity.defaultProps = {activeOpacity: 0.8};

export const MARGIN = 12;
export const CARD_HEIGHT = DEFAULT_CARD_HEIGHT + MARGIN * 2;

const Card = ({tool, navigation, handleCart, cartCount, y, index}) => {
  const {colors} = useTheme();
  const [buttonState, setButtonState] = useState(true);
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

  const handleAddToCart = () => {
    if (buttonState) {
      setButtonState(false);
      handleCart();
    }
  };

  return (
    <Animated.View
      style={[
        styles.cardWrapper,
        {
          alignSelf: 'center',
          marginVertical: MARGIN,
        },
      ]}
      key={index}>
      <TouchableOpacity style={{flex: 1}} onPress={onPress}>
        <View style={styles.cardImage}>
          <CardImage path={tool.url} />
          <LinearGradient
            colors={['transparent', colors.primary]}
            style={styles.linearGradient}
          />
          <View style={styles.actionWrapper}>
            {tool.location.provinceCode && (
              <TouchableOpacity style={styles.locationTool} onPress={() => {}}>
                <MaterialCommunityIcons
                  name="map-marker"
                  color={'#ffffff'}
                  size={16}
                />
                <Text style={{color: '#ffffff'}}>
                  Popular tool in{' '}
                  {tool.location.provinceCode ? tool.location.provinceCode : ''}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.likeTool} onPress={() => {}}>
              <MaterialCommunityIcons
                name="heart-outline"
                color={'#f2f2f2'}
                size={16}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveTool} onPress={() => {}}>
              <MaterialCommunityIcons
                name="bookmark-outline"
                color={'#f2f2f2'}
                size={16}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addToCart}
              onPress={handleAddToCart}>
              <MaterialCommunityIcons
                name="cart-plus"
                color={'#f2f2f2'}
                size={16}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.moreMenu}
              onPress={() => navigation.navigate('BottomScreen')}>
              <MaterialCommunityIcons
                name="dots-vertical"
                color={'#1B2023'}
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
        <View style={[styles.cardBase, {paddingHorizontal: 10}]}>
          <View style={styles.divider} />
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
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Card;
