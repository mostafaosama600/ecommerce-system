// eslint-disable-next-line no-unused-vars
import React from "react";
import Joi from "joi";
import { useState } from "react";

const Signin = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
        const response = await fetch("http://localhost:3000/api/v1/users/", {
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
    }
  };

  function validationRegisterForm() {
    let scheme = Joi.object({
      name: Joi.string().min(3).max(20).required(),
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net", "org", "eg"] } })
        .required(),
      phone: Joi.string().required(),
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
          index == 3 ? (
            <div key={index} className="alert alert-danger ">
              password must start with capital character and have at least 8
              character
            </div>
          ) : (
            <div key={index} className="alert alert-danger ">
              {error.message}
            </div>
          )
        )}
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
          {loading ? "loading .." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Signin;
