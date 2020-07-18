import React, {useState, useEffect, useReducer, useMemo} from 'react';
import makeApolloClient from './apollo';
import {ApolloProvider} from 'react-apollo';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import RootNavigator from '_navigations/root-navigator';
import DrawerNavigator from '_navigations/drawer-navigator';
import Loader from '_core/loader';
import {AuthContext} from '_utils/context/';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';

const App = () => {
  const initialLoginState = {
    user: null,
    isLoading: true,
    login: null,
    token: null,
  };

  loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          // user: action.payload,
          login: action.id,
          token: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          user: action.payload,
          login: action.id,
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
          // user: action.payload,
          login: action.id,
          token: action.token,
          isLoading: false,
        };
      default:
        return prevState;
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);
  const [client, setClient] = useState(null);

  console.log('Login State', loginState);

  const fetchSession = async () => {
    const client = makeApolloClient();
    setClient(client);
  };

  const authContext = useMemo(
    () => ({
      user: loginState.user,
      loginUser: async userData => {
        const userToken = String(userData.token);
        try {
          await AsyncStorage.setItem('x-token', userToken);
        } catch (error) {
          console.log(error);
        }

        dispatch({
          type: 'LOGIN',
          payload: userData,
          token: userToken,
        });
      },
      logoutUser: async () => {
        try {
          await AsyncStorage.removeItem('x-token');
        } catch (error) {
          console.log(error);
        }
        dispatch({type: 'LOGOUT'});
      },
      registerUser: () => {},
      toggleTheme: () => {},
    }),
    [],
  );

  useEffect(() => {
    fetchSession();
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('x-token');
      } catch (error) {
        console.log(error);
      }
      dispatch({
        type: 'RETRIEVE_TOKEN',
        token: userToken,
      });
    }, 1000);
  }, []);

  if (!client) {
    return <Loader />;
  }

  if (loginState.isLoading) {
    return <Loader />;
  }

  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <AuthContext.Provider value={authContext}>
          <SafeAreaProvider>
            <NavigationContainer>
              {loginState.token !== null ? (
                <DrawerNavigator />
              ) : (
                <RootNavigator />
              )}
            </NavigationContainer>
          </SafeAreaProvider>
        </AuthContext.Provider>
      </PaperProvider>
    </ApolloProvider>
  );
};

export default App;
