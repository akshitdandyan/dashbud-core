import Pages from "./Pages";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    from,
    ApolloLink,
    concat,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { SERVER_URL } from "./Config/envs";

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        // error is arised mainly due to token expiration
        // temporary solution is to clear token and logout user
        localStorage.removeItem("userToken");
    }
});

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem("userToken");
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : "",
        },
    });
    return forward(operation);
});

const httpLink = from([errorLink, new HttpLink({ uri: `${SERVER_URL}/api` })]);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
});

function App() {
    return (
        <div className="App">
            <ApolloProvider client={client}>
                <Pages />
            </ApolloProvider>
        </div>
    );
}

export default App;
