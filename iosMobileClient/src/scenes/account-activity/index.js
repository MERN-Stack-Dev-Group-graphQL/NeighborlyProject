import React from 'react';
import {StatusBar, StyleSheet, Text, View, Button} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import styled from 'styled-components';

const AccountActivity = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(16, 43, 70, 1)"
      />

      <View style={styles.alignContent}>
        <Text>Account Activity Page</Text>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
};

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
    height: '100%',
  },
});

export default AccountActivity;
