import React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');
const ratio = 300 / 260;
export const CARD_WIDTH = width * 0.9;
export const CARD_HEIGHT = CARD_WIDTH * ratio;

export const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: '#ffffff',
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 16,
  },
  cardImage: {
    flex: 3,
    overflow: 'hidden',
    backgroundColor: 'gray',
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardBody: {
    flex: 1,
    position: 'relative',
    padding: 10,
  },
  cardBase: {
    flex: 1,
  },
  cardTitle: {
    textTransform: 'capitalize',
    fontSize: 22,
    fontWeight: 'bold',
    paddingRight: 55,
    marginBottom: 4,
  },
  cardText: {
    paddingBottom: 10,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    position: 'absolute',
    height: 50,
    width: 50,
    borderRadius: 25,
    top: -35,
    right: 16,
  },
  actionWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 12,
    color: 'gray',
    paddingLeft: 8,
  },
  buttonWrapper: {
    elevation: 8,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 120,
    height: 40,
    lineHeight: 40,
    borderRadius: 20,
    backgroundColor: '#0B57BF',
    textTransform: 'uppercase',
    marginLeft: 'auto',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 14,
    color: '#ffffff',
    alignSelf: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  addToCart: {
    marginLeft: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#1B2023',
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeTool: {
    marginLeft: 'auto',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#1B2023',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveTool: {
    marginLeft: 'auto',
    width: 30,
    height: 30,
    marginLeft: 6,
    borderRadius: 15,
    backgroundColor: '#1B2023',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreMenu: {
    width: 20,
    height: 30,
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starCountWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  postedAt: {
    flexDirection: 'row',
  },
  priceUnitWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 26,
    letterSpacing: -1,
    fontWeight: 'bold',
  },
  unit: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.5)',
    paddingLeft: 6,
  },
  toolImage: {
    ...StyleSheet.absoluteFillObject,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    opacity: 0.25,
  },
});
