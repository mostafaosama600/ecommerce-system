/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import DeleteAccount from "./DeleteAccount";

const UpdateInformation = ({ loginUser }) => {
  const [updateUserInfo, setUpdateUserInfo] = useState({
    name: loginUser?.name,
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function getUserAddressInfo(e) {
    setUpdateUserInfo({
      ...updateUserInfo,
      [e.target.name]: e.target.value,
    });
  }

  const formUpdateInfo = async (e) => {
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
          body: JSON.stringify(updateUserInfo),
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
    <form className="mt-5 w-50" onSubmit={formUpdateInfo}>
      <div className="text-left">
        <p>Update your information</p>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row row-cols-1 p-0 row-cols-md-2 g-2">
        <div className="col">
          <label htmlFor="name">name</label>
          <input
            type="text"
            value={updateUserInfo.name}
            onChange={getUserAddressInfo}
            className="form-control"
            name="name"
          />
        </div>
        <div className="col">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={updateUserInfo.email}
            onChange={getUserAddressInfo}
            className="form-control"
            name="email"
          />
        </div>
        <div className="col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={updateUserInfo.password}
            onChange={getUserAddressInfo}
            className="form-control"
            name="password"
          />
        </div>
      </div>
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary mt-3">
          {loading ? "updating..." : "update"}
        </button>
        <DeleteAccount loginUser={loginUser} />
      </div>
    </form>
  );
};

export default UpdateInformation;
