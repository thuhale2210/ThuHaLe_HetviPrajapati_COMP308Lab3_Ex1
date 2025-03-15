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


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";

// Import micro frontends dynamically
const Login = React.lazy(() => import("auth/Login"));
const Signup = React.lazy(() => import("auth/Signup"));
const Posts = React.lazy(() => import("community/Posts"));
const HelpRequests = React.lazy(() => import("community/HelpRequests"));

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<React.Suspense fallback={<div>Loading...</div>}><Login /></React.Suspense>} />
          <Route path="/signup" element={<React.Suspense fallback={<div>Loading...</div>}><Signup /></React.Suspense>} />
          <Route path="/posts" element={<React.Suspense fallback={<div>Loading...</div>}><Posts /></React.Suspense>} />
          <Route path="/help-requests" element={<React.Suspense fallback={<div>Loading...</div>}><HelpRequests /></React.Suspense>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
