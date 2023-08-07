/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Addresses from "../components/Addresses";
import UpdateInformation from "../components/UserInfo/UpdateInformation";

const Profile = ({ loginUser }) => {
  const [userAddressInfo, setUserAddressInfo] = useState({
    name: "",
    street: "",
    city: "",
    country: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function getUserAddressInfo(e) {
    setUserAddressInfo({ ...userAddressInfo, [e.target.name]: e.target.value });
  }

  const formSubmitAddress = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("userToken");

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/v1/addresses", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
        body: JSON.stringify(userAddressInfo),
      });

      if (response.ok) {
        setLoading(false);
      } else if (response.status === 401) {
        setError("Token not provided");
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
      {loginUser ? (
        <div>
          <p>Good evening {loginUser.name}</p>
        </div>
      ) : (
        ""
      )}

      <UpdateInformation loginUser={loginUser} />

      <form className="mt-5 w-50" onSubmit={formSubmitAddress}>
        <div className="text-left">
          <p>Please add your address!</p>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row row-cols-1 p-0 row-cols-md-2 g-2">
          <div className="col">
            <label htmlFor="name">Place Name home/work</label>
            <input
              type="text"
              value={userAddressInfo.name}
              onChange={getUserAddressInfo}
              className="form-control"
              name="name"
            />
          </div>
          <div className="col">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              value={userAddressInfo.street}
              onChange={getUserAddressInfo}
              className="form-control"
              name="street"
            />
          </div>
          <div className="col">
            <label htmlFor="city">City</label>
            <input
              type="text"
              value={userAddressInfo.city}
              onChange={getUserAddressInfo}
              className="form-control"
              name="city"
            />
          </div>
          <div className="col">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              value={userAddressInfo.country}
              onChange={getUserAddressInfo}
              className="form-control"
              name="country"
            />
          </div>
          <div className="col">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              value={userAddressInfo.phone}
              onChange={getUserAddressInfo}
              className="form-control"
              name="phone"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {loading ? "Loading..." : "Send"}
        </button>
      </form>
      <Addresses loginUser={loginUser} />
    </div>
  );
};

export default Profile;
