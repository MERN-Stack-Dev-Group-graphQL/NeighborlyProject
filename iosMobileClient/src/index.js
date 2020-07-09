import React, {useState, useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
// import 'react-native-gesture-handler';
import makeApolloClient from './apollo';
import {ApolloProvider} from 'react-apollo';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
// Navigation
import RootNavigator from '_navigations';
// Components
import Loader from '_core/loader';
// import {AuthProvider} from '_utils/context/auth';

const App = () => {
  const [client, setClient] = useState(null);
  const fetchSession = async () => {
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
      <PaperProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </ApolloProvider>
  );
};

export default App;
