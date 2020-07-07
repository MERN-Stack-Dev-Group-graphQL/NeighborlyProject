import {createUploadLink} from 'apollo-upload-client';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';
import AsyncStorage from '@react-native-community/async-storage';

import {LOCAL_HOST_SERVER} from 'react-native-dotenv';

const makeApolloClient = () => {
  const uploadLink = new createUploadLink({
    uri: `${LOCAL_HOST_SERVER}/graphql`,
  });

  const authLink = setContext(() => {
    const token = AsyncStorage.getItem('x-token');
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(uploadLink),
    cache: new InMemoryCache(),
  });

  return client;
};

export default makeApolloClient;
