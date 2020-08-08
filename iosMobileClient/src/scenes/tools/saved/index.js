import React from 'react';
import {StatusBar, StyleSheet, Text, View, Button} from 'react-native';
import {useTheme} from '@react-navigation/native';
import SafeAreaView from 'react-native-safe-area-view';

const SavedTools = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <View style={styles.alignContent}>
        <Text>Saved Tools Page</Text>
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

export default SavedTools;
