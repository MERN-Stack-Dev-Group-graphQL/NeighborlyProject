import React, {useReducer, useState, createContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null,
  isLoading: true,
};

if (AsyncStorage.getItem('x-token')) {
  const decodedToken = jwtDecode(AsyncStorage.getItem('x-token'));

  if (decodedToken.exp * 1000 < Date.now()) {
    AsyncStorage.removeItem('x-token');
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: userData => {},
  logout: () => {},
  toggleTheme: () => {
    setIsDarkTheme(isDarkTheme => !isDarkTheme);
  },
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isLoading: false,
      };
    default:
      return state;
  }
}

const CustomDefaultTheme = {
  colors: {
    background: '#ffffff',
    text: '#333333',
  },
};

const CustomDarkTheme = {
  colors: {
    background: '#333333',
    text: '#ffffff',
  },
};

function AuthProvider(props) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [state, dispatch] = useReducer(authReducer, initialState);

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  function login(userData) {
    AsyncStorage.setItem('x-token', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  }

  function logout() {
    AsyncStorage.removeItem('x-token');
    dispatch({
      type: 'LOGOUT',
    });
  }

  return (
    <AuthContext.Provider
      value={{user: state.user, login, logout}}
      {...props}
    />
  );
}

export {AuthContext, AuthProvider};
