import React, {useState, useEffect, useCallback} from 'react';
import makeApolloClient from './apollo';
import {ApolloProvider} from '@apollo/client';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {AuthContext, ThemeContext} from '_utils/context/';
import {lightTheme} from '_theme/light';
import {darkTheme} from '_theme/dark';
import {useAuth} from '_utils/hooks/useAuth';
import RootNavigator from '_navigations/root-navigator';
import Loader from '_core/loader';

const RootComponent = () => {
  const {authContext, loginState} = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const switchTheme = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  return (
    <PaperProvider>
      <ThemeContext.Provider value={switchTheme}>
        <AuthContext.Provider value={authContext}>
          <SafeAreaProvider>
            <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
              <RootNavigator
                isLoading={loginState.isLoading}
                currentUser={loginState.user}
              />
            </NavigationContainer>
          </SafeAreaProvider>
        </AuthContext.Provider>
      </ThemeContext.Provider>
    </PaperProvider>
  );
};

const App = () => {
  const [client, setClient] = useState(null);
  const fetchSession = () => {
    const client = makeApolloClient();
    setClient(client);
  };

  useEffect(() => {
    fetchSession();
  }, []);

  if (!client) {
    return <Loader />;
  }

  return (
    <ApolloProvider client={client}>
      <RootComponent />
    </ApolloProvider>
  );
};

export default App;
