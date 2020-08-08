import React, {useState, useContext} from 'react';
import {useMutation} from '@apollo/client';
import {
  Platform,
  Text,
  View,
  ScrollView,
  Button,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {Formik} from 'formik';
import {UserContext} from '_utils/context/';
import {useTheme} from '@react-navigation/native';
import {BG_IMAGE, DEFAULT_AVATAR} from '_assets';
import {UPDATE_USER} from '_utils/graphql';
import TextInput from '_components/form/text-input';
import DismissKeyboard from '_core/dismiss-keyboard';
import Avatar from '_core/avatar';
import Loader from '_core/loader';
import * as Yup from 'yup';

const {width, height} = Dimensions.get('window');
const ratio = 1080 / 1640;
const HEIGHT = width * ratio;
const WIDTH = width - 32;

const ProfileSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('A username is required'),
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your First Name'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your Last Name'),
  email: Yup.string()
    .email('Invalid email')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const EditProfile = ({navigation}) => {
  const {user} = useContext(UserContext);
  const {colors} = useTheme();
  const [avatar, setAvatar] = useState({
    styles: {
      height: 120,
      width: 120,
      borderRadius: 60,
      borderColor: colors.white,
      borderWidth: 3,
      marginRight: 16,
    },
    url: DEFAULT_AVATAR,
  });

  const [profileData, setProfileData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    country: '',
    zip: '',
    bio: '',
  });

  const [updateUser, {loading}] = useMutation(UPDATE_USER);
  const profileHandle = async (
    username,
    firstName,
    lastName,
    email,
    city,
    country,
    zip,
    bio,
  ) => {
    try {
      setProfileData({
        ...profileData,
        username,
        firstName,
        lastName,
        email,
        city,
        country,
        zip,
        bio,
      });

      console.log('USER ID: ', user._id);
      console.log('NEW PROFILE DATA: ', profileData);

      await updateUser({variables: {_id: user._id, input: profileData}});
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView>
      <Loader loading={loading} />
      <DismissKeyboard>
        <ScrollView
          snapToInterval={height}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <View style={styles.alignContent}>
            <View style={[styles.header, {backgroundColor: colors.primary}]}>
              <ImageBackground source={BG_IMAGE} style={styles.headerImage}>
                <View style={styles.userHeader}>
                  <View style={styles.userContainer}>
                    <Avatar avatar={avatar} />
                  </View>
                </View>
              </ImageBackground>
            </View>

            <Formik
              validationSchema={ProfileSchema}
              initialValues={{
                username: user.username ? user.username : '',
                firstName: user.firstName ? user.firstName : '',
                lastName: user.lastName ? user.lastName : '',
                email: user.email ? user.email : '',
                city: user.city ? user.city : '',
                country: user.country ? user.country : '',
                zip: user.zip ? user.zip : '',
                bio: user.bio ? user.bio : '',
              }}
              onSubmit={values =>
                profileHandle(
                  values.username,
                  values.firstName,
                  values.lastName,
                  values.email,
                  values.city,
                  values.country,
                  values.zip,
                  values.bio,
                )
              }>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={{width, alignItems: 'center', paddingTop: 20}}>
                  <TouchableOpacity
                    style={[
                      styles.buttonContainer,
                      {backgroundColor: colors.primary},
                    ]}
                    onPress={handleSubmit}>
                    <Text style={[styles.buttonText, {color: colors.white}]}>
                      Update Account
                    </Text>
                  </TouchableOpacity>

                  <TextInput
                    iconError="account-outline"
                    iconValid="account-outline"
                    placeholder="Username"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    autoCapitalize="none"
                    touched={touched.username}
                    error={errors.username}
                    value={values.username}
                    style={{borderRadius: 0}}
                  />

                  <TextInput
                    iconError="account-outline"
                    iconValid="account-outline"
                    placeholder="First Name"
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    autoCapitalize="none"
                    touched={touched.firstName}
                    error={errors.firstName}
                    value={values.firstName}
                    style={{borderRadius: 0}}
                  />

                  <TextInput
                    iconError="account-outline"
                    iconValid="account-outline"
                    placeholder="Last Name"
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    autoCapitalize="none"
                    touched={touched.lastName}
                    error={errors.lastName}
                    value={values.lastName}
                    style={{borderRadius: 0}}
                  />

                  <TextInput
                    iconError="email-outline"
                    iconValid="email-outline"
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    autoCapitalize="none"
                    touched={touched.email}
                    error={errors.email}
                    value={values.email}
                    style={{borderRadius: 0}}
                  />

                  <TextInput
                    iconError="map-marker-outline"
                    iconValid="map-marker-outline"
                    placeholder="City"
                    onChangeText={handleChange('city')}
                    onBlur={handleBlur('city')}
                    autoCapitalize="none"
                    touched={touched.city}
                    value={values.city}
                    style={{borderRadius: 0}}
                  />

                  <TextInput
                    iconError="flag-outline"
                    iconValid="flag-outline"
                    placeholder="Country"
                    onChangeText={handleChange('country')}
                    onBlur={handleBlur('country')}
                    autoCapitalize="none"
                    touched={touched.country}
                    value={values.country}
                    style={{borderRadius: 0}}
                  />

                  <TextInput
                    iconError="map-marker-radius-outline"
                    iconValid="map-marker-radius-outline"
                    placeholder="Zip"
                    onChangeText={handleChange('zip')}
                    onBlur={handleBlur('zip')}
                    autoCapitalize="none"
                    touched={touched.zip}
                    value={values.zip}
                    style={{borderRadius: 0}}
                  />

                  <TextInput
                    iconError="square-edit-outline"
                    iconValid="square-edit-outline"
                    underlineColorAndroid="transparent"
                    placeholder="Bio"
                    multiline
                    numberOfLines={4}
                    onChangeText={handleChange('bio')}
                    onBlur={handleBlur('bio')}
                    autoCapitalize="none"
                    touched={touched.bio}
                    value={values.bio}
                    style={{
                      borderRadius: 0,
                      height: 100,
                      alignItems: 'flex-start',
                      paddingTop: 10,
                    }}
                  />
                </View>
              )}
            </Formik>

            <Button
              title="Return Home"
              onPress={() => navigation.navigate('Home')}
            />
          </View>

          {/* <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}>
          <MaterialCommunityIcons
            name="close"
            color={'rgba(255,255,255,1)'}
            size={24}
          />
        </TouchableOpacity> */}
        </ScrollView>
      </DismissKeyboard>
    </SafeAreaView>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  userHeader: {},
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
  },
  buttonContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    height: 40,
    width: WIDTH,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
  },
  goBackButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: 50,
    right: 20,
  },
});

export default EditProfile;
