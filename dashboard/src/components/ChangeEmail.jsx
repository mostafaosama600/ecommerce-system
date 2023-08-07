/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";

const ChangeEmail = ({ loginUser }) => {
  const [user, setUser] = useState({ email: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function getUser(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  // formChangeEmail

  const formChangeEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/users/${loginUser?.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        setLoading(false);
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
    <div className="container">
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={formChangeEmail}>
        <div className="col d-flex">
          <input
            type="email"
            value={user.email}
            onChange={getUser}
            name="email"
          />
          <button type="submit" className="btn btn-primary p-2 m-1">
            {loading ? "loading .." : "Change email"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeEmail;
