import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {
  useValue,
  onScrollEvent,
  interpolateColor,
  useScrollHandler,
} from 'react-native-redash';
import Animated, {
  multiply,
  divide,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import Slide, {SLIDE_HEIGHT, BORDER_RADIUS} from './slide';
import FooterSlide from './footer-slide';
import Dot from './dot';

const bgImage = require('_assets/images/tool-background.png');
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  activityContainer: {
    alignItems: 'center',
    height: 80,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  slider: {
    height: SLIDE_HEIGHT,
  },

  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: '#003167',
    overflow: 'hidden',
    justifyContent: 'center',
    width,
    height: SLIDE_HEIGHT,
  },
  imageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideImageWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideImage: {
    top: 40,
  },
});

const slides = [
  {
    title: '',
    header: 'Rent, Track and List Tools',
    description:
      'Join us and see what thousands are saying is the smartest way to DIY projects.',
    color: '#003167',
    bgColor: '#003167',
    image: require('_assets/images/onboarding-image-1.png'),
  },
  {
    title: '',
    header: 'Browse available tools',
    description: 'Save time, money and space when you rent from Neighborly.',
    color: '#73A1C2',
    bgColor: '#003167',
    image: require('_assets/images/onboarding-image-2.png'),
  },
  {
    title: '',
    header: 'Pick your tool',
    description:
      'Choose if you would like to get tool delivered or pick up yourself.',
    color: '#FD9922',
    bgColor: '#003167',
    image: require('_assets/images/onboarding-image-3.png'),
  },
  {
    title: '',
    header: 'Track Delivery',
    description:
      'Use Neighborly QR Code to get the latest tool status and estimated delivery time.',
    color: '#0B57BF',
    bgColor: '#003167',
    image: require('_assets/images/onboarding-image-4.png'),
  },
];

const SplashScreen = ({navigation}) => {
  const scroll = useRef(null);
  const {scrollHandler, x} = useScrollHandler();
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map(slide => slide.color),
  });

  return (
    <ImageBackground source={bgImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#003167"
          translucent={true}
        />

        <Animated.View style={[styles.slider, {backgroundColor}]}>
          {slides.map(({image}, index) => {
            const opacity = interpolate(x, {
              inputRange: [
                (index - 0.85) * width,
                index * width,
                (index + 0.5) * width,
              ],
              outputRange: [0, 1, 0],
              extrapolate: Extrapolate.CLAMP,
            });
            return (
              <Animated.View
                style={[styles.slideImageWrapper, {opacity}]}
                key={index}>
                <Image source={image} style={styles.slideImage} />
              </Animated.View>
            );
          })}

          <Animated.ScrollView
            ref={scroll}
            horizontal
            snapToInterval={width}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            bounces={false}
            {...scrollHandler}>
            {slides.map(({title, image}, index) => {
              return <Slide key={index} {...{title, image}} />;
            })}
          </Animated.ScrollView>
        </Animated.View>
        <View style={styles.footer}>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor,
            }}
          />
          <View style={styles.footerContent}>
            <View style={styles.pagination}>
              {slides.map((_, index) => (
                <Dot key={index} currentIndex={divide(x, width)} {...{index}} />
              ))}
            </View>
            <Animated.View
              style={{
                flex: 1,
                flexDirection: 'row',
                width: width * slides.length,
                transform: [{translateX: multiply(x, -1)}],
              }}>
              {slides.map(({header, description, cta}, index) => {
                return (
                  <FooterSlide
                    key={index}
                    onPress={() => {
                      if (index === slides.length - 1) {
                        navigation.navigate('Login');
                      }

                      if (scroll.current) {
                        scroll.current
                          .getNode()
                          .scrollTo({x: width * (index + 1), animated: true});
                      }
                    }}
                    onSkip={() => {
                      if (scroll.current) {
                        scroll.current.getNode().scrollTo({
                          x: width * (slides.length - 1),
                          animated: true,
                        });
                      }
                    }}
                    last={index === slides.length - 1}
                    {...{header, description, cta}}
                  />
                );
              })}
            </Animated.View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;
