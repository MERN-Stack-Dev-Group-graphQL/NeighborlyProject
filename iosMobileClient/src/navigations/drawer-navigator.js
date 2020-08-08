import React from 'react';
import {Image, TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './tab-navigator';
import DrawerContent from './drawer-content';
import ProfileScreen from '_scenes/profile';
import EditProfileScreen from '_scenes/edit-profile';
import AccountActivityScreen from '_scenes/account-activity';
import NotificationsScreen from '_scenes/notifications';
import FiltersScreen from '_scenes/filters';
import SavedToolsScreen from '_scenes/tools/saved';
import TrackToolsScreen from '_scenes/tools/track';
import CartScreen from '_scenes/cart';
import {useTheme} from '@react-navigation/native';

const AppDrawer = createDrawerNavigator();
const Stack = createStackNavigator();

const BrandLogo = () => {
  return (
    <Image
      style={styles.brandLogoImage}
      source={require('../assets/images/brand-logo-navbar.png')}
    />
  );
};

const screenOptions = ({navigation, route}) => ({
  headerTitle: props => <BrandLogo {...props} />,
  headerRight: () => (
    <View style={styles.headerRightNav}>
      <Image
        style={styles.avatar}
        source={{
          uri: 'https://randomuser.me/api/portraits/men/1.jpg',
        }}
      />
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Image
          style={styles.hamburgerMenu}
          source={require('../assets/images/hamburger.png')}
        />
      </TouchableOpacity>
    </View>
  ),
  headerStyle: {
    backgroundColor: '#003167',
    shadowOffset: {height: 0, width: 0},
  },
  headerTintColor: 'rgba(255,255,255, 1)',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
});

const Profile = () => {
  const {colors} = useTheme();

  return (
    <Stack.Navigator initialRouteName="Profile" screenOptions={screenOptions}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: 'User Profile',
          headerMode: 'none',
          headerRight: () => {},
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerTitle: 'Edit Profile',
          headerRight: () => (
            <View style={styles.headerRightNav}>
              <TouchableOpacity onPress={() => {}}>
                <Text style={[styles.applyBtn, {color: colors.white}]}>
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerTitle: 'Shopping Cart',
          headerRight: () => (
            <View style={styles.headerRightNav}>
              <TouchableOpacity onPress={() => {}}>
                <Text style={[styles.applyBtn, {color: colors.white}]}>
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const AccountActivity = () => {
  return (
    <Stack.Navigator
      initialRouteName="Account Activity"
      screenOptions={screenOptions}>
      <Stack.Screen
        name="Account Activity"
        component={AccountActivityScreen}
        options={{headerTitle: 'Account Activity'}}
      />
    </Stack.Navigator>
  );
};

const Notifications = () => {
  return (
    <Stack.Navigator
      initialRouteName="Notifications"
      screenOptions={screenOptions}>
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{headerTitle: 'Notifications'}}
      />
    </Stack.Navigator>
  );
};

const Filters = () => {
  return (
    <Stack.Navigator initialRouteName="Filters" screenOptions={screenOptions}>
      <Stack.Screen
        name="Filters"
        component={FiltersScreen}
        options={{headerTitle: 'Filters'}}
      />
    </Stack.Navigator>
  );
};

const SavedTools = () => {
  return (
    <Stack.Navigator
      initialRouteName="Saved Tools"
      screenOptions={screenOptions}>
      <Stack.Screen
        name="Saved Tools"
        component={SavedToolsScreen}
        options={{headerTitle: 'Saved Tools'}}
      />
    </Stack.Navigator>
  );
};

const TrackTools = () => {
  return (
    <Stack.Navigator
      initialRouteName="Track Tools"
      screenOptions={screenOptions}>
      <Stack.Screen
        name="Track Tools"
        component={TrackToolsScreen}
        options={{headerTitle: 'Track Tools'}}
      />
    </Stack.Navigator>
  );
};

const Cart = () => {
  return (
    <Stack.Navigator initialRouteName="Cart" screenOptions={screenOptions}>
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{headerTitle: 'Cart'}}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <AppDrawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <AppDrawer.Screen
        name="Tabs"
        component={TabNavigator}
        options={{drawerLabel: 'Home'}}
      />
      <AppDrawer.Screen name="Profile" component={Profile} />
      <AppDrawer.Screen name="Account Activity" component={AccountActivity} />
      <AppDrawer.Screen name="Notifications" component={Notifications} />
      <AppDrawer.Screen name="Filters" component={Filters} />
      <AppDrawer.Screen name="Saved Tools" component={SavedTools} />
      <AppDrawer.Screen name="Track Tools" component={TrackTools} />
      <AppDrawer.Screen name="Cart" component={Cart} />
    </AppDrawer.Navigator>
  );
};

const styles = StyleSheet.create({
  headerRightNav: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  hamburgerMenu: {
    width: 30,
    height: 20,
    marginLeft: 10,
  },
  brandLogoImage: {
    width: 168,
    height: 30,
  },
  applyBtn: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DrawerNavigator;
