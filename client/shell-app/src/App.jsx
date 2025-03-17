// import React, { useState, useEffect, lazy, Suspense } from 'react';
// import { useQuery, gql } from '@apollo/client';
// import './App.css';

// const UserApp = lazy(() => import('userApp/App'));
// const CommunityApp = lazy(() => import('communityApp/App'));

// // GraphQL query to check the current user's authentication status
// const CURRENT_USER_QUERY = gql`
//   query CurrentUser {
//     currentUser {
//       username
//     }
//   }
// `;

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Use Apollo's useQuery hook to perform the authentication status check on app load
//   const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {
//     fetchPolicy: 'network-only',
//   });

//   useEffect(() => {
//     // Listen for the custom loginSuccess event from the UserApp
//     const handleLoginSuccess = (event) => {
//       setIsLoggedIn(event.detail.isLoggedIn);
//     };

//     window.addEventListener('loginSuccess', handleLoginSuccess);

//     // Check the authentication status based on the query's result
//     if (!loading && !error) {
//       setIsLoggedIn(!!data.currentUser);
//     }

//     return () => {
//       window.removeEventListener('loginSuccess', handleLoginSuccess);
//     };
//   }, [loading, error, data]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error! {error.message}</div>;

//   return (
//     <div className="App">
//       <Suspense fallback={<div>Loading...</div>}>
//         {!isLoggedIn ? <UserApp /> : <CommunityApp />}
//       </Suspense>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useQuery, gql } from '@apollo/client';
import './App.css';

// Import Micro-Frontends
const UserApp = lazy(() => import('userApp/App'));
const CommunityApp = lazy(() => import('communityApp/App'));

// GraphQL Query to fetch user details (REPLACING `currentUser`)
const GET_USER_QUERY = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      username
    }
  }
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get user ID from local storage (Set during login)
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      setIsLoggedIn(true);
    }

    // Listen for loginSuccess event from UserApp
    const handleLoginSuccess = (event) => {
      const { userId } = event.detail;
      localStorage.setItem("userId", userId); // Store user ID
      setUserId(userId);
      setIsLoggedIn(true);
    };

    window.addEventListener('loginSuccess', handleLoginSuccess);
    return () => window.removeEventListener('loginSuccess', handleLoginSuccess);
  }, []);

  // Fetch user data only if logged in
  const { loading, error } = useQuery(GET_USER_QUERY, {
    variables: { id: userId },
    skip: !userId, // Don't run the query if no userId is found
    fetchPolicy: 'network-only',
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        {!isLoggedIn ? <UserApp /> : <CommunityApp />}
      </Suspense>
    </div>
  );
}

export default App;