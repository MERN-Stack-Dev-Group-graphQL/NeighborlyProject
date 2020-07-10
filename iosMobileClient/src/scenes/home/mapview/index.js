import React, {useState, useEffect, useRef} from 'react';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet, View, Text, Image, Platform, Alert} from 'react-native';
import {LOCAL_HOST_SERVER} from 'react-native-dotenv';
import {useTheme} from '@react-navigation/native';
import {mapDarkStyle, mapStandardStyle} from '_scenes/home/mapview/mapstyles';
import styled from 'styled-components';

const HomeMapView = props => {
  const theme = useTheme();
  const _map = useRef(null);
  const tools = props.data.getTools.edges;

  const ImageBlock = path => {
    if (path.url.length > 1) {
      return (
        <Image
          style={styles.image}
          source={{
            uri: `${LOCAL_HOST_SERVER}${path.url}`,
          }}
        />
      );
    }
    return (
      <Image
        style={styles.image}
        source={{
          uri: `${LOCAL_HOST_SERVER}/assets/img/default.jpg`,
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
        region={{
          latitude: 39.931911,
          longitude: -75.340184,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
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
                      </View>
                      <ImageBlock url={tool.url} />
                    </View>
                    <View style={styles.arrowBorder} />
                    <View style={styles.arrow} />
                  </View>
                </Callout>
              </Marker>
            ),
        )}
      </MapView>
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
  bubble: {
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
  },
  description: {
    fontSize: 11,
    marginBottom: 5,
  },
  body: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 80,
  },
});

export default HomeMapView;
