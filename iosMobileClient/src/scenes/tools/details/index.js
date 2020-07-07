import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StarCount from '_core/review/starcount';
import {LOCAL_HOST_SERVER} from 'react-native-dotenv';
import styled from 'styled-components';

MaterialCommunityIcons.loadFont();

const ToolDetails = ({route, navigation}) => {
  const {itemId, tool, starCount, rateCount} = route.params;

  const ImageBlock = path => {
    if (path.url.length > 1) {
      return (
        <Image
          source={{
            uri: `${LOCAL_HOST_SERVER}${path.url}`,
          }}
          style={{
            width: '100%',
            aspectRatio: 1,
          }}
        />
      );
    }
    return (
      <Image
        source={{
          uri: `${LOCAL_HOST_SERVER}/assets/img/default.jpg`,
        }}
        style={{
          width: '100%',
          aspectRatio: 1,
        }}
      />
    );
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
          <ImageBlock url={tool.url} />
        </CardImageWrapper>
        <CardBody>
          <Avatar
            source={{
              uri: 'https://randomuser.me/api/portraits/men/1.jpg',
            }}
          />
          <CardTitle>{tool.title}</CardTitle>
          <StarCountWrapper>
            <StarCount starCount={starCount} rateCount={rateCount} />
            <Price>$49.99</Price>
          </StarCountWrapper>

          <CardText>{tool.description}</CardText>

          <Highlights>
            <HRows>
              <HColLeft>
                <HColLeftText>Manufacturer:</HColLeftText>
              </HColLeft>
              <Text>{tool.make}</Text>
            </HRows>
            <HRows>
              <HColLeft>
                <HColLeftText>Model:</HColLeftText>
              </HColLeft>
              <Text>{tool.model}</Text>
            </HRows>
            <HRows>
              <HColLeft>
                <HColLeftText>Color:</HColLeftText>
              </HColLeft>
              <Text>{tool.color}</Text>
            </HRows>
            <HRows>
              <HColLeft>
                <HColLeftText>Dimensions:</HColLeftText>
              </HColLeft>
              <Text>{tool.dimensions}</Text>
            </HRows>
            <HRows>
              <HColLeft>
                <HColLeftText>Item Weight:</HColLeftText>
              </HColLeft>
              <Text>{tool.weight}</Text>
            </HRows>
            <HRows>
              <HColLeft>
                <HColLeftText>Electrical Ratings:</HColLeftText>
              </HColLeft>
              <Text>{tool.electricalRatings}</Text>
            </HRows>
            <HRows>
              <HColLeft>
                <HColLeftText>Item ID:</HColLeftText>
              </HColLeft>
              <Text>{itemId}</Text>
            </HRows>
          </Highlights>

          <AddToCart
            onPress={() => {
              Alert.alert(`${tool.title} added to cart.`);
            }}>
            <Text style={{color: '#fff', textTransform: 'uppercase'}}>
              Add to Cart
            </Text>
          </AddToCart>

          <Button
            title="Return Home"
            onPress={() => navigation.navigate('Home')}
          />
        </CardBody>
      </CardBlock>
    </CardWrapper>
  );
};

const Highlights = styled.View``;

const HRows = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const HColLeft = styled.View`
  min-width: 140px;
`;

const HColLeftText = styled.Text`
  font-weight: bold;
`;

const CardWrapper = styled.ScrollView`
  flex: 1;
  background: #ffffff;
  margin: 10px;
  border-radius: 5px;
`;

const CardBlock = styled.View``;

const CardImageWrapper = styled.View`
  width: 100%;
  background: gray;
  overflow: hidden;
`;

const CardImage = styled.Image`
  height: 100%;
  width: 100%;
`;

const CardBody = styled.View`
  display: flex;
  position: relative;
  padding: 16px;
`;

const StarCountWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;

const Price = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-left: auto;
`;

const AddToCart = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 50px;
  margin: 10px auto;
  border-radius: 25px;
  background-color: rgba(23, 162, 184, 1);
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
  padding-bottom: 20px;
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

export default ToolDetails;
