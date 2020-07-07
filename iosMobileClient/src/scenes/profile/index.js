import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const styles = StyleSheet.create({
  alignContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red',
    height: '100%',
  },
});

const Profile = ({navigation}) => {
  return (
    <View style={styles.alignContent}>
      <Text>Profile Page</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
};

export default Profile;
