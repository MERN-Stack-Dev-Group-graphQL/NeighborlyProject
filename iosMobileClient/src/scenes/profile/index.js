import React, {useState, useContext} from 'react';
import {
  Platform,
  Text,
  View,
  Button,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {ThemeContext, UserContext} from '_utils/context/';
import {useTheme} from '@react-navigation/native';
import {BG_IMAGE, DEFAULT_AVATAR} from '_assets';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Avatar from '_core/avatar';

const {width} = Dimensions.get('window');
const ratio = 1080 / 1640;
const HEIGHT = width * ratio;
const WIDTH = width - 32;

const Profile = ({navigation}) => {
  const {user} = useContext(UserContext);
  const {colors} = useTheme();
  const [avatar, setAvatar] = useState({
    styles: {
      height: 100,
      width: 100,
      borderRadius: 50,
      borderColor: colors.white,
      borderWidth: 3,
      marginRight: 16,
    },
    url: DEFAULT_AVATAR,
  });
  const [menu, setMenu] = useState([
    {
      name: 'Your Rewards',
      iconLeft: 'currency-usd-circle-outline',
      iconRight: 'chevron-right',
      _id: '1',
    },
    {
      name: 'Your Orders',
      iconLeft: 'cart',
      iconRight: 'chevron-right',
      _id: '2',
    },
    {
      name: 'Activity',
      iconLeft: 'account-convert',
      iconRight: 'chevron-right',
      _id: '3',
    },
    {
      name: 'History',
      iconLeft: 'history',
      iconRight: 'chevron-right',
      _id: '4',
    },
    {
      name: 'Followers',
      iconLeft: 'account-arrow-right-outline',
      iconRight: 'chevron-right',
      _id: '5',
    },
    {
      name: 'Following',
      iconLeft: 'account-arrow-left-outline',
      iconRight: 'chevron-right',
      _id: '6',
    },
    {
      name: 'Sign Out',
      iconLeft: 'logout',
      iconRight: 'chevron-right',
      _id: '7',
    },
  ]);

  return (
    <View style={styles.alignContent}>
      <View style={[styles.header, {backgroundColor: colors.primary}]}>
        <ImageBackground source={BG_IMAGE} style={styles.headerImage}>
          <View style={styles.userHeader}>
            <View style={styles.userContainer}>
              <Avatar avatar={avatar} />
              <View>
                <Text style={[styles.profileName, {color: colors.white}]}>{`${
                  user.firstName
                } ${user.lastName}`}</Text>
                <Text style={{color: colors.whiteOpaque}}>{user.email}</Text>
              </View>
            </View>
          </View>

          <View style={styles.actionBar}>
            <TouchableOpacity
              onPress={() => {
                navigation.push('EditProfile');
              }}>
              <MaterialCommunityIcons
                name="circle-edit-outline"
                color={colors.white}
                size={24}
              />
            </TouchableOpacity>
            <Feather name="settings" color={colors.white} size={24} />
            <TouchableOpacity
              onPress={() => {
                navigation.push('Cart');
              }}>
              <MaterialCommunityIcons
                name="cart"
                color={colors.white}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <FlatList
        data={menu}
        renderItem={({item}) => (
          <View style={styles.item}>
            <MaterialCommunityIcons
              name={item.iconLeft}
              color={colors.black}
              size={24}
              style={[styles.itemIcon, {marginRight: 10}]}
            />
            <Text style={styles.itemName}>{item.name}</Text>
            <MaterialCommunityIcons
              name={item.iconRight}
              color={colors.black}
              size={24}
              style={[styles.itemIcon, {marginLeft: 'auto'}]}
            />
          </View>
        )}
        keyExtractor={item => item._id}
      />

      <Button title="Return Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
  },
  alignContent: {
    alignItems: 'center',
  },
  header: {
    position: 'relative',

    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.075)',
    width,
    height: HEIGHT,
    overflow: 'hidden',
  },
  headerImage: {
    flexGrow: 1,
    width,
    height: HEIGHT,
  },
  actionContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
    right: 10,
    left: 10,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width / 3,
    maxWidth: 120,
    marginTop: 20,
    marginRight: 16,
    marginLeft: 'auto',
  },
  userHeader: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'flex-end',
    bottom: 20,
    left: 16,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileName: {
    fontSize: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  itemIcon: {},
  goBackButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    left: 20,
  },
});

export default Profile;
