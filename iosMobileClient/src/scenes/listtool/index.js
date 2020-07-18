import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

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

const ListTool = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#003167" />

      <View style={styles.alignContent}>
        <Text>List Tool Page</Text>
      </View>
    </SafeAreaView>
  );
};

export default ListTool;
