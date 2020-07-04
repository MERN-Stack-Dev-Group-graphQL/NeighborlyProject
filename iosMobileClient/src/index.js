import React, {useState, useEffect} from 'react';
// import {Platform, StatusBar, StyleSheet, View} from 'react-native';

import Navigator from '_navigations';

import {ApolloProvider} from 'react-apollo';
import makeApolloClient from './apollo';
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
      <Navigator />
    </ApolloProvider>
  );
};

export default App;
