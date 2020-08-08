import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Image,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FETCH_TOOLS_BY_ID_QUERY} from '_utils/graphql';
import {useQuery} from '@apollo/client';
import {useTheme} from '@react-navigation/native';
import {CardImage} from '_core/card/card-image';
import {currencyFormat} from '_utils/currencyFormat';
import StarCount from '_core/review/starcount';
import Loader from '_core/loader';
import Error from '_core/error';

const {height} = Dimensions.get('window');

const ToolDetails = ({route, navigation}) => {
  const {colors} = useTheme();
  const {itemId, tool, starCount, rateCount} = route.params;
  const {loading, error, data} = useQuery(FETCH_TOOLS_BY_ID_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      toolId: itemId,
    },
  });

  if (loading) {
    return <Loader loading={loading} />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const toolFeatures = [
    {
      header: 'Make',
      detail: tool.make,
    },
    {
      header: 'Model',
      detail: tool.model,
    },
    {
      header: 'Color',
      detail: tool.color,
    },
    {
      header: 'Dimensions',
      detail: tool.dimensions,
    },
    {
      header: 'Item Weight',
      detail: tool.weight,
    },
    {
      header: 'Electrical Ratings',
      detail: tool.electricalRatings,
    },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.cardWrapper, {backgroundColor: colors.white}]}>
      <View>
        <View style={styles.cardImage}>
          <CardImage path={tool.url} />
          <LinearGradient
            colors={['transparent', colors.primary]}
            style={styles.linearGradient}
          />
        </View>
        <View style={styles.cardBody}>
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://randomuser.me/api/portraits/men/1.jpg',
            }}
          />
          <Text style={styles.cardTitle}>{tool.title}</Text>
          <View style={styles.startCountWrapper}>
            <StarCount starCount={starCount} rateCount={rateCount} />
            <Text style={styles.price}>{currencyFormat(tool.price)}</Text>
          </View>

          <Text style={styles.cardText}>{tool.description}</Text>

          <View>
            {toolFeatures.map((feature, index) => (
              <View style={styles.row} key={index}>
                <View style={styles.colLeft}>
                  <Text style={styles.text}>{feature.header}</Text>
                </View>
                <Text>{feature.detail}</Text>
              </View>
            ))}
            <View style={styles.row}>
              <View style={styles.colLeft}>
                <Text style={styles.text}>Item ID:</Text>
              </View>
              <Text>{itemId}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.addToCart, {backgroundColor: colors.primaryLight}]}
            onPress={() => {
              setTimeout(() => {
                Alert.alert(`${tool.title} added to cart.`);
              }, 100);
            }}>
            <Text style={[styles.cartText, {color: colors.white}]}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
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
    flex: 1,
    height: height * 0.33,
    width: '100%',
    backgroundColor: 'gray',
  },
  cardBody: {
    flex: 2,
    position: 'relative',
    padding: 16,
  },
  cardTitle: {
    textTransform: 'capitalize',
    fontSize: 24,
    fontWeight: 'bold',
    paddingRight: 55,
    marginBottom: 4,
  },
  cardText: {
    paddingBottom: 20,
  },
  avatar: {
    position: 'absolute',
    height: 50,
    width: 50,
    borderRadius: 25,
    transform: [{translateY: -25}],
    right: 16,
  },
  startCountWrapper: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  text: {
    fontWeight: 'bold',
  },
  cartText: {
    textTransform: 'uppercase',
  },
  toolImage: {
    ...StyleSheet.absoluteFillObject,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    opacity: 0.25,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  colLeft: {
    minWidth: 140,
  },
  colRight: {},
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  addToCart: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 240,
    height: 50,
    marginVertical: 10,
    marginHorizontal: 'auto',
    borderRadius: 25,
  },
});

export default ToolDetails;
