import {DefaultTheme} from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    background: '#f8f8f8',
    primary: '#003167',
    primaryLight: '#0E4CB7',
    secondary: '#318FE6',
    accent: '#E9A001',
    text: '#000000',
  },
};
