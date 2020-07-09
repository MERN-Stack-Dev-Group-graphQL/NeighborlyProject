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

const CardList = ({tool, navigation, handleCart, cartCount}) => {
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
      <ButtonContainer onPress={onPress}>
        <CardBody>
          <View style={styles.cardImage}>
            <ImageBlock url={tool.url} />
            <Avatar
              source={{
                uri: 'https://randomuser.me/api/portraits/men/1.jpg',
              }}
            />
          </View>
          <View style={{paddingHorizontal: 10}}>
            <View style={styles.header}>
              <CardTitle>{tool.title}</CardTitle>
              <StarCountWrapper>
                <StarCount starCount={starCount} rateCount={rateCount} />
              </StarCountWrapper>
            </View>
            <ActionWrapper>
              <PriceUnitWrapper>
                <Price>$49.99</Price>
                <Unit>/ per day</Unit>
              </PriceUnitWrapper>
            </ActionWrapper>
          </View>
        </CardBody>
      </ButtonContainer>
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
    height: 80,
    width: 80,
    backgroundColor: 'gray',
  },
  header: {
    flexDirection: 'column',
  },
});

const ButtonContainer = styled.TouchableOpacity`
  elevation: 8;
  display: flex;
  width: 100%;
`;

const CardImage = styled.Image`
  height: 100%;
  width: 100%;
`;

const CardBody = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  padding: 10px;
`;

const StarCountWrapper = styled.View`
  margin-bottom: 8px;
`;

const Avatar = styled.Image`
  position: absolute;
  height: 30px;
  width: 30px;
  border-radius: 15px;
  transform: translateY(-8px);
  left: -8px;
  border-width: 2px;
  border-color: #ffffff;
`;

const CardTitle = styled.Text`
  text-transform: capitalize;
  font-size: 18px;
  font-weight: bold;
  padding-right: 55px;
  margin-bottom: 4px;
`;

const ActionWrapper = styled.View`
  margin-top: auto;
`;

const PostedDate = styled.View`
  flex-direction: row;
`;

const ActionText = styled.Text`
  padding-left: 6px;
  font-size: 12px;
  color: gray;
`;

const PriceUnitWrapper = styled.View`
  align-items: flex-start;
  flex-direction: row;
  align-items: center;
`;

const Price = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const Unit = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  padding-left: 6px;
`;

export default CardList;
