import React, {useReducer, createContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null,
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
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

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
