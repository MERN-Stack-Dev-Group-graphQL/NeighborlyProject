import {ApolloClient} from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client';
import {setContext} from 'apollo-link-context';
import {cache} from '_utils/graphql/cache';
import SecureStorage from 'react-native-secure-storage';
import * as routes from '_utils/constants/routes';

const makeApolloClient = () => {
  const link = new createUploadLink({uri: routes.GRAPHQL_URL});
  const authLink = setContext(async (_, {headers}) => {
    const token = await SecureStorage.getItem('x-token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    cache,
    link: authLink.concat(link),
  });

  return client;
};

export default makeApolloClient;
