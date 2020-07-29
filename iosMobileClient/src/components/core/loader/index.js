import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorContainer: {
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const Loader = props => {
  const {loading, ...attributes} = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.loaderContainer}>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator animating={loading} />
        </View>
      </View>
    </Modal>
  );
};
export default Loader;
