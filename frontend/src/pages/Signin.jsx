/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

const Signin = (props) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function getUser(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const formSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const validation = validationRegisterForm();
    if (validation.error) {
      setLoading(false);
      setErrorList(validation.error.details);
    } else {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/users/signin",
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
          props.getUserInfo();
          setLoading(false);
          navigate("/products");
        } else {
          const errorData = await response.json();
          setError(errorData.msg);
        }
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  function validationRegisterForm() {
    let scheme = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net", "org", "eg"] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });

    return scheme.validate(user, { abortEarly: false });
  }

  return (
    <div className="container mt-5">
      <br />
      <form className="mt-5" onSubmit={formSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        {errorList.map((error, index) =>
          index == 1 ? (
            <div key={index} className="alert alert-danger ">
              invalid password
            </div>
          ) : (
            <div key={index} className="alert alert-danger ">
              {error.message}
            </div>
          )
        )}
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
