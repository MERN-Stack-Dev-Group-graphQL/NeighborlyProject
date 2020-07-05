import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import makeApolloClient from './apollo';
import {ApolloProvider} from 'react-apollo';
import Loader from '_core/loader';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from '_navigations';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

Ionicons.loadFont();
Feather.loadFont();
MaterialIcons.loadFont();
MaterialCommunityIcons.loadFont();

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
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default App;
