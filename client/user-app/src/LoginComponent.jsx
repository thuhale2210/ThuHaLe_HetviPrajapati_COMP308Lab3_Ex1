import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

function LoginComponent() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: formData });
      localStorage.setItem("token", data.login.token);
      window.location.href = "http://localhost:5000/dashboard";
    } catch (err) {
      console.error("Login Error:", err.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="text-danger">{error.message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" className="form-control" required 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input type="password" placeholder="Password" className="form-control mt-2" required 
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <button type="submit" className="btn btn-success mt-3">Login</button>
      </form>
    </div>
  );
}

export default LoginComponent;
