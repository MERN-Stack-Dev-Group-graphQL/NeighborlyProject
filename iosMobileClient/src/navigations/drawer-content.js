import React, {useState, useContext} from 'react';
import {
  Title,
  Avatar,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {AuthContext, ThemeContext, UserContext} from '_utils/context/';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DrawerContent = props => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const switchTheme = useContext(ThemeContext);
  const {logoutUser} = useContext(AuthContext);
  const {user} = useContext(UserContext);
  const {colors} = useTheme();
  const toggleTheme = () => {
    switchTheme();
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <View style={styles.drawerContent}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri: 'https://randomuser.me/api/portraits/men/1.jpg',
            }}
            size={50}
          />
          <Title style={styles.title}>
            {user ? `${user.firstName} ${user.lastName}` : 'John Doe'}
          </Title>
          <Caption style={styles.caption}>
            {user ? `@${user.username}` : '@johndoe'}
          </Caption>
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
              props.navigation.navigate('Profile');
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
              props.navigation.navigate('Account Activity');
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
              props.navigation.navigate('Notifications');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <MaterialCommunityIcons name="tune" color={color} size={size} />
            )}
            label="Filters"
            onPress={() => {
              props.navigation.navigate('Filters');
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
              props.navigation.navigate('Saved Tools');
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
              props.navigation.navigate('Track Tools');
            }}
          />
        </Drawer.Section>
        <Drawer.Section title="Preferences">
          <TouchableRipple
            onPress={() => {
              toggleTheme();
            }}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={isDarkTheme} color={colors.primary} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section>
        <DrawerItem
          style={styles.bottomDrawerSection}
          icon={({color, size}) => (
            <MaterialCommunityIcons name="logout" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            logoutUser();
          }}
        />
      </Drawer.Section>
    </View>
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
  bottomDrawerSection: {
    marginBottom: 15,
  },
});

export default DrawerContent;
