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
import {AppButton} from '_core/button';
import Icon from 'react-native-vector-icons/dist/Feather';
import styled from 'styled-components';

TouchableOpacity.defaultProps = {activeOpacity: 0.8};
Icon.loadFont();

const Card = ({tool: {_id, title, description, createdAt, url, photo}}) => {
  // http://localhost:4000${path.url
  const ImageBlock = path => {
    if (path.url.length > 1) {
      return (
        <CardImage
          source={{
            uri: `http://localhost:4000${path.url}`,
          }}
        />
      );
    }
    return (
      <CardImage
        source={{
          uri: 'http://localhost:4000/assets/img/default.jpg',
        }}
      />
    );
  };

  // const toolId = _id;

  // const avatar = 'https://localhost:4000/assets/img/avatar-default.png';

  const onPress = () => {
    Alert.alert('Details button clicked!');
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
          <CardText>{description}</CardText>
          <ActionText>
            <Icon name="clock" size={16} color="gray" />
            <Text> Posted 6 days ago</Text>
          </ActionText>
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
  margin-bottom: 16px;
`;

const CardText = styled.Text`
  padding-bottom: 10px;
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
