import {DefaultTheme} from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    success: '#3adb76',
    warning: '#ffae00',
    alert: '#cc4b37',
    background: '#f8f8f8',
    primary: '#003167',
    primaryLight: '#0E4CB7',
    secondary: '#318FE6',
    accent: '#E9A001',
    accentLight: '#FFCE00',
    grayLight: '#e6e6e6',
    grayMedium: '#cacaca',
    grayDark: '#1B2023',
    text: '#000000',
  },
};
