import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.innonitrkl.in/",
  cache: new InMemoryCache(),
});

export default client;
