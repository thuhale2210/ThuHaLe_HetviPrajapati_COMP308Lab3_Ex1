// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App



// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ApolloProvider } from "@apollo/client";
// import client from "./apolloClient";
// import PostComponent from "./PostComponent";
// import HelpRequestComponent from "./HelpRequestComponent";

// function App() {
//   return (
//     <ApolloProvider client={client}>
//       <Router>
//         <div className="container mt-4">
//           <Routes>
//             <Route path="/posts" element={<PostComponent />} />
//             <Route path="/help-requests" element={<HelpRequestComponent />} />
//           </Routes>
//         </div>
//       </Router>
//     </ApolloProvider>
//   );
// }

// export default App;

import './App.css';
import CommunityComponent from './CommunityComponent';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// // Set up your ApolloClient
// const client = new ApolloClient({
//   uri: 'http://localhost:4002/graphql', // Set this to your actual GraphQL endpoint
//   cache: new InMemoryCache(),
//   credentials: 'include'
// });

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
