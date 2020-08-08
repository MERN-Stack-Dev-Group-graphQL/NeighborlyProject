import React from 'react';
import {StatusBar, StyleSheet, Text, View, Button} from 'react-native';
import {useTheme} from '@react-navigation/native';
import SafeAreaView from 'react-native-safe-area-view';

const Chat = () => {
  const {colors} = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <View style={styles.alignContent}>
        <Text>Chat Page</Text>
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

export default Chat;
