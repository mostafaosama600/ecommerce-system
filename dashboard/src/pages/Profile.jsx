/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import ChangePassword from "../components/ChangePassword";
import ChangeEmail from "../components/ChangeEmail";
import DeleteAccount from "../components/DeleteAccount";

const Profile = ({ loginUser }) => {
  const [user, setUser] = useState({ name: loginUser?.name || "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function getUser(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const formUpdateInfo = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // signinAdmin
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
    <div>
      <p>hello {loginUser ? <span>{loginUser.name}</span> : ""}</p>

      <div className="container">
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={formUpdateInfo}>
          <div className="col d-flex">
            <input
              type="text"
              value={user.name}
              onChange={getUser}
              name="name"
            />
            <button type="submit" className="btn btn-primary p-2 m-1">
              {loading ? "loading .." : "Edit"}
            </button>
          </div>
        </form>

        <ChangeEmail loginUser={loginUser} />
        <ChangePassword loginUser={loginUser} />
        <DeleteAccount loginUser={loginUser} />
      </div>
    </div>
  );
};

export default Profile;
