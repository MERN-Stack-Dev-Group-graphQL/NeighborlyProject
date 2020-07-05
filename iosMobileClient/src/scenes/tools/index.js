import React from 'react';
import {StatusBar, StyleSheet, Text, View, Button} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import styled from 'styled-components';

const Tools = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(16, 43, 70, 1)"
      />

      <View style={styles.alignContent}>
        <Text style={{color: 'white'}}>Tools Page</Text>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
        <Button
          title="Go back to first screen in stack"
          onPress={() => navigation.popToTop()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 43, 70, 1)',
  },
  alignContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red',
    height: '100%',
  },
});

export default Tools;
