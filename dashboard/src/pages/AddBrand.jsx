// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const AddBrand = () => {
  const [user, setUser] = useState({ name: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function getUser(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const formAddBrand = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/v1/brands/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

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

      <form onSubmit={formAddBrand}>
        <div className="col">
          <input type="text" value={user.name} onChange={getUser} name="name" />
        </div>
        <button type="submit" className="btn btn-primary p-1 m-1">
          {loading ? "loading .." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default AddBrand;
