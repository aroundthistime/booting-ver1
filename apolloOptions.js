import { WebSocketLink } from '@apollo/client/link/ws';
import { split, HttpLink, ApolloLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from "@react-native-async-storage/async-storage";

const URI = "http://192.168.0.9:5000"

const httpLink = new HttpLink({
    uri : URI,
    credentials: 'same-origin'
})
// const httpLink = new HttpLink({uri : URI})

const wsLink = new WebSocketLink({
    uri: `ws://192.168.0.9:5000/`,
    options: {
      reconnect: true,
    }
  });

const authHttpLink = setContext(async(_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('jwt');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});



  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    authHttpLink.concat(httpLink),
  );


// const authMiddleware = new ApolloLink(async (operation, forward) => {
//     operation.setContext({
//         headers: {
//             Authorization: `Bearer ${await AsyncStorage.getItem("jwt")}`,
//         },
//     })
//     return forward(operation);
// });

// export default {
//     uri : URI,
//     link : concat(authMiddleware, httpLink)
// }

export default {
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    splitLink
  ]),
};
