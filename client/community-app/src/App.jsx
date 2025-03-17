import './App.css';
import CommunityComponent from './CommunityComponent';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Set up your ApolloClient for the API gateway
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Set this to your actual GraphQL endpoint
  cache: new InMemoryCache(),
  credentials: 'include'
});

function App() {

  return (
    <div className='App'>
      <ApolloProvider client={client}>
        <CommunityComponent />
      </ApolloProvider>
    </div>
  );
}

export default App;
