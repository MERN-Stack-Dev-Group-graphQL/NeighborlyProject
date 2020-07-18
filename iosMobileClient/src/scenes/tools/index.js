import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red',
    height: '100%',
  },
});

const Tools = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#003167" />

      <View style={[styles.alignContent, {paddingHorizontal: 40}]}>
        <MaterialCommunityIcons
          name="tools"
          color={'#003167'}
          size={80}
          style={{marginBottom: 20, opacity: 0.15}}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 20,
          }}>
          You have no current or recently rented tools yet
        </Text>
        <Text style={{textAlign: 'center'}}>
          Track status, changes, usage, transactions and more here
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Tools;
