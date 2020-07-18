import {ApolloClient} from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';
import AsyncStorage from '@react-native-community/async-storage';
import * as routes from '_utils/constants/routes';

// import {LOCAL_HOST_SERVER} from 'react-native-dotenv';

const makeApolloClient = () => {
  // const link = new createUploadLink({ uri: `${routes.LOCAL_HOST}/graphql`});
  const link = new createUploadLink({uri: `${routes.LOCAL_HOST}/graphql`});

  const authLink = setContext(async (_, {headers}) => {
    const token = await AsyncStorage.getItem('x-token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache(),
  });

  return client;
};

export default makeApolloClient;
