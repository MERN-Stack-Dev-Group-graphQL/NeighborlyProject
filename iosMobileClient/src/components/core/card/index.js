import React, {useState} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  Alert,
  TextInput,
  TouchableHighlight,
  Button,
  View,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {AppButton} from '_core/button';
import Feather from 'react-native-vector-icons/dist/Feather';
import styled from 'styled-components';
import {LOCAL_HOST_SERVER} from 'react-native-dotenv';
import StarCount from '_core/review/starcount';

TouchableOpacity.defaultProps = {activeOpacity: 0.8};
Feather.loadFont();
MaterialCommunityIcons.loadFont();

const Card = ({tool, navigation, handleCart, cartCount}) => {
  const [buttonState, setButtonState] = useState(true);
  const ImageBlock = path => {
    if (path.url.length > 1) {
      return (
        <CardImage
          source={{
            uri: `${LOCAL_HOST_SERVER}${path.url}`,
          }}
        />
      );
    }
    return (
      <CardImage
        source={{
          uri: `${LOCAL_HOST_SERVER}/assets/img/default.jpg`,
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
      <View>
        <View style={styles.cardImage}>
          <ImageBlock url={tool.url} />
        </View>

        <CardBody>
          <AvatarWrapper>
            <Avatar
              source={{
                uri: 'https://randomuser.me/api/portraits/men/1.jpg',
              }}
            />
          </AvatarWrapper>
          <CardTitle>{tool.title}</CardTitle>
          <StarCountWrapper>
            <StarCount starCount={starCount} rateCount={rateCount} />
          </StarCountWrapper>
          <CardText>{tool.description}</CardText>
          <ActionWrapper>
            <Feather name="clock" size={16} color="gray" />
            <ActionText>
              {' '}
              Posted {moment(tool.createdAt).fromNow(true)} ago
            </ActionText>
            <SaveToolIcon>
              <MaterialCommunityIcons
                name="bookmark-outline"
                color={'rgba(0,0,0,0.25)'}
                size={24}
              />
            </SaveToolIcon>
            <AddToCartIcon onPress={handleAddToCart}>
              <MaterialCommunityIcons
                name="cart-plus"
                color={'rgba(0,0,0,0.25)'}
                size={30}
              />
            </AddToCartIcon>
          </ActionWrapper>
        </CardBody>
        <CardFooter>
          <PriceUnitWrapper>
            <Price>$49.99</Price>
            <Unit>/ per day</Unit>
          </PriceUnitWrapper>
          <ButtonContainer onPress={onPress}>
            <ButtonText>Details</ButtonText>
          </ButtonContainer>
        </CardFooter>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: '#ffffff',
    margin: 10,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 12,
  },
  cardImage: {
    height: 260,
    width: '100%',
    backgroundColor: 'gray',
  },
});

const AvatarWrapper = styled.View`
  position: relative;
`;

const CardImage = styled.Image`
  height: 100%;
  width: 100%;
`;

const CardBody = styled.View`
  display: flex;
  position: relative;
  padding: 10px;
`;

const StarCountWrapper = styled.View`
  margin-bottom: 16px;
`;

const Avatar = styled.Image`
  position: absolute;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  transform: translateY(-25px);
  right: 16px;
`;

const CardTitle = styled.Text`
  text-transform: capitalize;
  font-size: 24px;
  font-weight: bold;
  padding-right: 55px;
  margin-bottom: 4px;
`;

const CardText = styled.Text`
  padding-bottom: 10px;
`;

const ActionWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ActionText = styled.Text`
  color: gray;
`;

const CardFooter = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-top: auto;
`;

const PriceUnitWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Price = styled.Text`
  font-size: 30px;
  font-weight: bold;
`;

const Unit = styled.Text`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  padding-left: 6px;
`;

const SaveToolIcon = styled.View`
  margin-left: auto;
`;

const AddToCartIcon = styled.TouchableOpacity`
  margin-left: 8px;
`;

const ButtonContainer = styled.TouchableOpacity`
  elevation: 8;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  max-width: 120px;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
  background-color: rgba(23, 162, 184, 1);
  text-transform: uppercase;
  margin-left: auto;
  padding-vertical: 10px;
  padding-horizontal: 12px;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: #ffffff;
  align-self: center;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export default Card;
