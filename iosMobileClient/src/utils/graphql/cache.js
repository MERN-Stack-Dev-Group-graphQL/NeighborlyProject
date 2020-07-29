import {InMemoryCache} from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Tool: {
      fields: {
        make(make) {
          return `${make}`;
        },
      },
    },
  },
});
