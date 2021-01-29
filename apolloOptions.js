import { ApolloLink, concat, HttpLink } from "apollo-boost"

const URI = "http://192.168.0.9:5000"

const httpLink = new HttpLink({uri : URL})

const authMiddleware = new ApolloLink(async (operation, forward) => {
    operation.setContext({
        headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("jwt")}`,
        },
    })
    return forward(operation);
});

export default {
    uri : URI,
    link : concat(authMiddleware, httpLink)
}
