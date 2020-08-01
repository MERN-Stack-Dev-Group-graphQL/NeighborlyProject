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
  Dimensions,
} from 'react-native';
import {currencyFormat} from '_utils/currencyFormat';
import LinearGradient from 'react-native-linear-gradient';
import StarCount from '_core/review/starcount';
import * as routes from '_utils/constants/routes';
import {FETCH_TOOLS_BY_ID_QUERY} from '_utils/graphql';
import {useQuery} from '@apollo/client';
import Loader from '_core/loader';
import Error from '_core/error';

const {height} = Dimensions.get('window');

const ToolDetails = ({route, navigation}) => {
  const {itemId, tool, starCount, rateCount} = route.params;
  const {loading, error, data} = useQuery(FETCH_TOOLS_BY_ID_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      toolId: itemId,
    },
  });

  const ImageBlock = path => {
    if (path.url.length > 1) {
      return (
        <Image
          source={{
            uri: `${routes.LOCAL_HOST}${path.url}`,
          }}
          style={styles.imageBlock}
        />
      );
    }
    return (
      <Image
        source={{
          uri: `${routes.LOCAL_HOST}/assets/img/default.jpg`,
        }}
        style={styles.imageBlock}
      />
    );
  };

  if (loading) {
    return <Loader loading={loading} />;
  }

  if (error) {
    return <Error error={error} />;
  }

  // console.log(data);
  // const {getToolById} = data;
  // let tool = {...getToolById};

  return (
    <ScrollView style={styles.cardWrapper}>
      <View>
        <View style={styles.cardImage}>
          <ImageBlock url={tool.url} />
          <LinearGradient
            colors={['transparent', '#003167']}
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
            <View style={styles.row}>
              <View style={styles.colLeft}>
                <Text style={styles.text}>Manufacturer:</Text>
              </View>
              <Text>{tool.make}</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.colLeft}>
                <Text style={styles.text}>Model:</Text>
              </View>
              <Text>{tool.model}</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.colLeft}>
                <Text style={styles.text}>Color:</Text>
              </View>
              <Text>{tool.color}</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.colLeft}>
                <Text style={styles.text}>Dimensions:</Text>
              </View>
              <Text>{tool.dimensions}</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.colLeft}>
                <Text style={styles.text}>Item Weight:</Text>
              </View>
              <Text>{tool.weight}</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.colLeft}>
                <Text style={styles.text}>Electrical Ratings:</Text>
              </View>
              <Text>{tool.electricalRatings}</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.colLeft}>
                <Text style={styles.text}>Item ID:</Text>
              </View>
              <Text>{itemId}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.addToCart}
            onPress={() => {
              Alert.alert(`${tool.title} added to cart.`);
            }}>
            <Text style={styles.cartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageBlock: {
    ...StyleSheet.absoluteFillObject,
  },
  cardWrapper: {
    flex: 1,
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
    color: '#fff',
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
    backgroundColor: '#0b57bf',
  },
});

export default ToolDetails;
