import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 












// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  function getUser(e) {
    // setUser({ ...user, [e.target.name]: e.target.value });
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    console.log(myUser);
  }

  async function formSubmit(e) {
    e.preventDefault();
    let { data } = await axios.post(
      `http://localhost:3000/api/v1/users/signup`,
      user
    );
    if (data) {
      //
    } else {
      setError(data.message);
    }
  }

  return (
    <div className="container mt-5">
      <br />
      <form className="mt-5" onSubmit={formSubmit}>
        <div className="alert alert-danger">{error}</div>
        <div className="mb-3">
          <label htmlFor="name">name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={user.name}
            onChange={getUser}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={user.email}
            onChange={getUser}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone">phone Address</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={user.phone}
            onChange={getUser}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Create password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={user.password}
            onChange={getUser}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;

 */
