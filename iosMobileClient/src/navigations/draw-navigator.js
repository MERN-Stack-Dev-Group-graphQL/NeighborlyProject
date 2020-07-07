import React from 'react';
import {
  useTheme,
  Title,
  Avatar,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {Image, View, StyleSheet, Alert} from 'react-native';
// Navigation
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DrawNavigator = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri: 'https://randomuser.me/api/portraits/men/1.jpg',
            }}
            size={50}
          />
          <Title style={styles.title}>John Smith</Title>
          <Caption style={styles.caption}>@johnsmith</Caption>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Profile"
            onPress={() => {
              Alert.alert('Profile Menu Clicked!');
              // props.navigation.navigate('Profile');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <MaterialCommunityIcons
                name="account-convert"
                color={color}
                size={size}
              />
            )}
            label="Account Activity"
            onPress={() => {
              Alert.alert('Account Activity Menu Clicked!');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <MaterialCommunityIcons
                name="bell-outline"
                color={color}
                size={size}
              />
            )}
            label="Notifications"
            onPress={() => {
              Alert.alert('Notifications Menu Clicked!');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <MaterialCommunityIcons name="tune" color={color} size={size} />
            )}
            label="Filters"
            onPress={() => {
              Alert.alert('Filters Menu Clicked!');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <MaterialCommunityIcons
                name="bookmark-outline"
                color={color}
                size={size}
              />
            )}
            label="Saved Tools"
            onPress={() => {
              Alert.alert('Saved Tools Menu Clicked!');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <MaterialCommunityIcons
                name="map-marker-path"
                color={color}
                size={size}
              />
            )}
            label="Track Tool(s)"
            onPress={() => {
              Alert.alert('Track Tool(s) Menu Clicked!');
            }}
          />
        </Drawer.Section>
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={false} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawNavigator;
