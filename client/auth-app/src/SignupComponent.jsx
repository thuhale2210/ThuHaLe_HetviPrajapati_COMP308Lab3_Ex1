import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      username
      email
    }
  }
`;

function SignupComponent() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [signup, { error }] = useMutation(SIGNUP_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ variables: formData });
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Signup Error:", err.message);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {error && <p className="text-danger">{error.message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" className="form-control" required 
          onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
        <input type="email" placeholder="Email" className="form-control mt-2" required 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input type="password" placeholder="Password" className="form-control mt-2" required 
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <button type="submit" className="btn btn-primary mt-3">Register</button>
      </form>
    </div>
  );
}

export default SignupComponent;
