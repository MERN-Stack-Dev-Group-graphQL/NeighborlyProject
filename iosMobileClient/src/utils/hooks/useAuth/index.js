import React, {useEffect, useReducer, useMemo} from 'react';
import SecureStorage from 'react-native-secure-storage';
import jwt_decode from 'jwt-decode';

export const useAuth = () => {
  const initialState = {
    user: null,
    isLoading: true,
    token: null,
  };

  loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          user: {...action.payload},
          token: {...action.token},
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          user: {...action.payload},
          token: {...action.token},
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          user: null,
          token: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          user: {...action.payload},
          token: {...action.token},
          isLoading: false,
        };
      case 'SET_LOADING':
        return {
          ...prevState,
          isLoading: action.payload,
        };
      default:
        return prevState;
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialState);
  const authContext = useMemo(
    () => ({
      user: loginState.user,
      loginUser: async userData => {
        const xToken = 'x-token';
        try {
          await SecureStorage.setItem(xToken, JSON.stringify(userData.token));
        } catch (error) {
          console.log(error);
        }

        const gotToken = await SecureStorage.getItem(xToken);
        const currentUser = {
          user: jwt_decode(gotToken),
          token: gotToken,
        };

        const userKey = 'user';
        await SecureStorage.setItem(userKey, JSON.stringify(currentUser));
        const gotUser = await SecureStorage.getItem(userKey);

        dispatch({
          type: 'LOGIN',
          payload: currentUser,
        });
      },
      logoutUser: async () => {
        const key = 'user';
        try {
          await SecureStorage.removeItem('x-token');
          await SecureStorage.removeItem(key);
        } catch (error) {
          console.log(error);
        }

        dispatch({type: 'LOGOUT'});
      },
      registerUser: async userData => {
        const key = 'x-token';
        try {
          await SecureStorage.setItem(key, JSON.stringify(userData.token));
        } catch (error) {
          console.log(error);
        }

        const gotToken = await SecureStorage.getItem(key);

        dispatch({
          type: 'REGISTER',
          payload: jwt_decode(gotToken),
        });
      },
      toggleTheme: () => {
        console.log('toggle theme');
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      await SecureStorage.getItem('user').then(user => {
        if (user) {
          dispatch({
            type: 'RETRIEVE_TOKEN',
            payload: JSON.parse(user),
          });
        } else {
          dispatch({
            type: 'SET_LOADING',
            payload: false,
          });
        }
      });
    }, 1000);
  }, []);

  return {authContext, loginState};
};
