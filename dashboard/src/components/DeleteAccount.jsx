/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteAccount = ({ loginUser }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const deleteAccount = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/users/${loginUser?.userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setLoading(false);
        localStorage.removeItem("userToken");
        navigate("/");
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

      <div className="col d-flex">
        <button
          type="submit"
          onClick={deleteAccount}
          className="btn btn-danger p-2 m-1"
        >
          {loading ? "deleting..." : "Delete account"}
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
