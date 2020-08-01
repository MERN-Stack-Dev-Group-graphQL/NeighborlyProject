import React, {useState} from 'react';
import {View, Modal, StyleSheet, Dimensions, PanResponder} from 'react-native';
import Animated, {interpolate} from 'react-native-reanimated';

const {height} = Dimensions.get('screen');

const BottomSheet = ({children, isVisible, onDismiss}) => {
  const HEIGHT = Animated.Value(height);
  const [visible, setVisible] = useState(false);
  const [panY, setPanY] = useState(HEIGHT);
  const POSITION = Animated.timing(panY, {toValue: 0, duration: 300});
  const [resetPositionAnim, setResetPositiinAnim] = useState(POSITION);
  const CLOSE = Animated.timing(panY, {toValue: height, duration: 500});
  const [closeAnim, setCloseAnim] = useState(CLOSE);

  const panResponders = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => false,
    onPanResponderMove: Animated.event([null, {dy: panY}]),
    onPanResponderRelease: (e, gs) => {
      if (gs.dy > 0 && gs.vy > 2) {
        return closeAnim.start(() => onDismiss());
      }
      return resetPositionAnim.start();
    },
  });

  const top = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  if (isVisible !== visible && visible) {
    resetPositionAnim.start();
  }

  const handleDismiss = () => {
    closeAnim.start(() => onDismiss());
  };

  return (
    <Modal
      animated
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={handleDismiss}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.container, {top}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
    paddingTop: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
});

export default BottomSheet;
