import React from 'react';
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
// import ToolDetails from '_scenes/tools/details';
// import navigations from '_navigations';
import {LOCAL_HOST_SERVER} from 'react-native-dotenv';
import StarCount from '_core/review/starcount';
import StarRating from '_core/review/starrating';

TouchableOpacity.defaultProps = {activeOpacity: 0.8};
Feather.loadFont();
MaterialCommunityIcons.loadFont();

const Card = ({
  tool: {_id, title, description, createdAt, url, photo},
  navigation,
}) => {
  // http://localhost:4000${path.url
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
      itemId: _id,
      otherParam: 'anything you want here',
    });
  };

  return (
    <CardWrapper
      style={{
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 12,
      }}>
      <CardBlock>
        <CardImageWrapper>
          <ImageBlock url={url} />
        </CardImageWrapper>

        <CardBody>
          <Avatar
            source={{
              uri: 'https://randomuser.me/api/portraits/men/1.jpg',
            }}
          />
          <CardTitle>{title}</CardTitle>
          <StarCountWrapper>
            <StarCount starCount={starCount} rateCount={rateCount} />
          </StarCountWrapper>
          <CardText>{description}</CardText>
          <ActionWrapper>
            <Feather name="clock" size={16} color="gray" />
            <ActionText>
              {' '}
              Posted {moment(createdAt).fromNow(true)} ago
            </ActionText>
            <SaveToolIcon>
              <MaterialCommunityIcons
                name="bookmark-outline"
                color={'rgba(0,0,0,0.25)'}
                size={24}
              />
            </SaveToolIcon>
          </ActionWrapper>
        </CardBody>
        <CardFooter>
          <ButtonContainer onPress={onPress}>
            <ButtonText>Details</ButtonText>
          </ButtonContainer>
        </CardFooter>
      </CardBlock>
    </CardWrapper>
  );
};

const CardWrapper = styled.View`
  background: #ffffff;
  margin: 10px;
  border-radius: 5px;
`;

const CardBlock = styled.View``;

const CardImageWrapper = styled.View`
  height: 260px;
  width: 100%;
  background: gray;
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

const SaveToolIcon = styled.View`
  margin-left: auto;
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
