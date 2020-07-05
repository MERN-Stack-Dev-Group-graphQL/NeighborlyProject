import React from 'react';
import {NavigationActions, StackNavigator} from 'react-navigation';
import {StyleSheet, ScrollView, Text, View} from 'react-native';

const SideMenu = ({navigation}) => {
  const navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    navigation.dispatch(navigateAction);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.sectionHeadingStyle}>Section 1</Text>
          <View style={styles.navSectionStyle}>
            <Text
              style={styles.navItemStyle}
              onPress={navigateToScreen('Page1')}>
              Page1
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.sectionHeadingStyle}>Section 2</Text>
          <View style={styles.navSectionStyle}>
            <Text
              style={styles.navItemStyle}
              onPress={navigateToScreen('Page2')}>
              Page2
            </Text>
            <Text
              style={styles.navItemStyle}
              onPress={navigateToScreen('Page3')}>
              Page3
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.sectionHeadingStyle}>Section 3</Text>
          <View style={styles.navSectionStyle}>
            <Text
              style={styles.navItemStyle}
              onPress={navigateToScreen('Page4')}>
              Page4
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <Text>This is my fixed footer</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
  navItemStyle: {
    padding: 10,
  },
  navSectionStyle: {
    backgroundColor: 'lightgrey',
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey',
  },
});

export default SideMenu;
