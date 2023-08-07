// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function getUser(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/signinAdmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("userToken", token);
        setLoading(false);
        navigate("/admin-page");
      } else {
        const errorData = await response.json();
        setError(errorData.msg);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <br />
      <form className="mt-5" onSubmit={formSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
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
          <label htmlFor="password">password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={user.password}
            onChange={getUser}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {loading ? "loading .." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Signin;
