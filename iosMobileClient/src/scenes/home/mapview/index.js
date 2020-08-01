import React, {useRef, useState, useEffect} from 'react';
import MapView, {
  AnimatedRegion,
  Marker,
  Callout,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import {useQuery} from '@apollo/client';
// import {CATEGORIES} from '_utils/graphql/mock';
import {FETCH_TOOLS_QUERY} from '_utils/graphql';
import {
  View,
  Text,
  Image,
  Platform,
  Alert,
  StyleSheet,
  TouchableOpacity,
  PermissionStatus,
} from 'react-native';
import * as routes from '_utils/constants/routes';
import {useTheme} from '@react-navigation/native';
import {mapDarkStyle, mapStandardStyle} from '_scenes/home/mapview/mapstyles';
import Loader from '_core/loader';
import CategoryTabs from '_components/category-tabs';
import Error from '_core/error';

const HomeMapView = ({navigation}) => {
  const mapRef = useRef();
  const theme = useTheme();
  const {colors} = useTheme();
  const {loading, error, data} = useQuery(FETCH_TOOLS_QUERY);
  // const tools = data.getTools.edges;
  const [region, setRegion] = useState({
    latitude: 39.931911,
    longitude: -75.340184,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        // const initialPosition = JSON.stringify(position);
        // console.log(JSON.stringify(position));

        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  useEffect(() => {
    if (mapRef) {
      console.log(mapRef);
    }

    (async () => {
      if (Platform.OS == 'ios') {
        locateCurrentPosition();
      }
    })();
  }, []);

  const ImageBlock = path => {
    if (path.url.length > 1) {
      return (
        <Image
          style={styles.image}
          source={{
            uri: `${routes.LOCAL_HOST}${path.url}`,
          }}
        />
      );
    }
    return (
      <Image
        style={styles.image}
        source={{
          uri: `${routes.LOCAL_HOST}/assets/img/default.jpg`,
        }}
      />
    );
  };

  if (loading) {
    return <Loader loading={loading} />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!data) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        showsUserLocation
        customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
        onRegionChangeComplete={region => setRegion(region)}>
        {/* {tools.map(
          tool =>
            tool.location.latitude &&
            tool.location.longitude && (
              <Marker
                key={tool._id}
                coordinate={{
                  latitude: tool.location.latitude,
                  longitude: tool.location.longitude,
                }}
                title={tool.title}
                description={`Make: ${tool.make} / Model: ${tool.model}`}
                image={require('_assets/images/map-marker.png')}>
                <Callout tooltip>
                  <View>
                    <View style={styles.bubble}>
                      <View style={styles.body}>
                        <Text style={styles.name}>{tool.title}</Text>
                        <Text style={styles.description}>
                          A short decription should be place here.
                        </Text>
                        <Text style={{fontWeight: 'bold'}}>$49.99</Text>
                      </View>
                      <View style={{flexGrow: 1, margin: 4}}>
                        <ImageBlock url={tool.url} />
                      </View>
                    </View>
                    <View style={styles.arrowBorder} />
                    <View style={styles.arrow} />
                  </View>
                </Callout>
              </Marker>
            ),
        )} */}
      </MapView>
      <CategoryTabs />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  categoryScrollView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  bubble: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    width: 150,
    overflow: 'hidden',
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  name: {
    fontSize: 14,
    marginBottom: 4,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#007a87',
  },
  description: {
    fontSize: 11,
    marginBottom: 5,
  },
  body: {
    flexGrow: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 80,
  },
});

export default HomeMapView;