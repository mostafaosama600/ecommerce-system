/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <span>System</span>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {props.loginUser ? (
            <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <Link className="nav-link" to="/add-product">
                  add product
                </Link>
                <Link className="nav-link" to="/add-brand">
                  add brands
                </Link>
                <Link className="nav-link" to="/add-category">
                  add category
                </Link>
                <Link className="nav-link" to="/add-subcategory">
                  add subcategory
                </Link>
                <Link className="nav-link" to="/create-account">
                  create account
                </Link>
              </ul>
            </>
          ) : (
            ""
          )}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {props.loginUser ? (
              <>
                <Link className="nav-link" to="/profile-admin">
                  profile
                </Link>
                <li className="nav-link text-dark" onClick={props.logout}>
                  log out
                </li>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/">
                  Sign in
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
