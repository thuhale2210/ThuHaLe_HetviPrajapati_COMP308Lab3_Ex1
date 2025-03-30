import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, gql } from "@apollo/client";

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      username
    }
  }
`;

function Navbar() {
  const navigate = useNavigate();
  const [logout] = useMutation(LOGOUT_MUTATION);
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'network-only',
  });

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("logoutSuccess"));
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const isLoggedIn = !!data?.currentUser;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Community Hub</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item nav-link text-white">
                  👋 {data.currentUser.username}
                </li>
                <li className="nav-item"><Link className="nav-link" to="/posts">Community Posts</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/help-requests">Help Requests</Link></li>
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/signup">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
