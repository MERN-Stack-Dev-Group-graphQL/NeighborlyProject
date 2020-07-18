import React, {useState, useEffect, useRef} from 'react';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// import {LOCAL_HOST_SERVER} from 'react-native-dotenv';
import Geolocation from '@react-native-community/geolocation';
import {useTheme} from '@react-navigation/native';
import * as routes from '_utils/constants/routes';
import {mapDarkStyle, mapStandardStyle} from '_scenes/home/mapview/mapstyles';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  toolsMapScroll: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 10 : 10,
    paddingHorizontal: 10,
  },
  toolsMakeIcon: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
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

const HomeMapView = props => {
  const theme = useTheme();
  const _map = useRef(null);
  const tools = props.data.getTools.edges;
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
        console.log(JSON.stringify(position));

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
    (async () => {
      if (Platform.OS == 'ios') {
        locateCurrentPosition();
      }
      // else {
      //   var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      //   console.log('Android: ' + response);

      //   if (response === 'granted') {
      //     locateCurrentPosition();
      //   }
      // }
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

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={styles.map}
        customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
        initialRegion={region}
        // onRegionChangeComplete={region => setRegion(region)}
      >
        {tools.map(
          (tool, index) =>
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
        )}
      </MapView>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.toolsMapScroll}>
        {tools.map((tool, index) => (
          <TouchableOpacity key={index} style={styles.toolsMakeIcon}>
            <Text>{tool.make}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeMapView;
