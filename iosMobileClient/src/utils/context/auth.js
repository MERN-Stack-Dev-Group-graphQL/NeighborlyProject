import React, {useReducer, createContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  user: null,
  token: null,
  login: null,
  isLoading: true,
};

const AuthContext = createContext({
  user: null,
  login: userData => {},
  logout: () => {},
  register: () => {},
});

function authReducer(prevState, action) {
  switch (action.type) {
    case 'RETRIEVE_TOKEN':
      return {
        ...prevState,
        user: action.payload,
        token: action.token,
        login: action.login,
        isLoading: false,
      };
    case 'LOGIN':
      return {
        ...prevState,
        user: action.payload,
        login: action.login,
        token: action.token,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...prevState,
        user: null,
        login: null,
        token: null,
        isLoading: false,
      };
    case 'REGISTER':
      return {
        ...prevState,
        user: action.payload,
        login: action.id,
        token: action.token,
        isLoading: false,
      };
    default:
      return prevState;
  }
}

function AuthProvider(props) {
  const [loginState, dispatch] = useReducer(authReducer, initialState);

  const login = async userData => {
    let token;
    token = null;
    if (login === userData.login && password === userData.password) {
      try {
        token = userData.token;
        await AsyncStorage.setItem('x-token', token);
      } catch (error) {
        console.log(error);
      }
    }
    dispatch({type: 'LOGIN', payload: userData, token: token});
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('x-token');
    } catch (error) {
      console.log(error);
    }
    dispatch({type: 'LOGOUT'});
  };

  const register = async () => {};

  return (
    <AuthContext.Provider
      value={{
        user: loginState.user,
        isLoading: loginState.isLoading,
        login,
        logout,
        register,
      }}
      {...props}
    />
  );
}

export {AuthContext, AuthProvider};
