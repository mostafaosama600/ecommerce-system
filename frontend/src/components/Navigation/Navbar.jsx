/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/products" className="navbar-brand">
          System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {props.loginUser ? (
            <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <Link className="nav-link active" to="/products">
                  Home
                </Link>
                <Link className="nav-link" to="/categories">
                  Categories
                </Link>
                <Link className="nav-link" to="/brands">
                  Brands
                </Link>
              </ul>
              <Search />
            </>
          ) : (
            ""
          )}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {props.loginUser ? (
              <>
                <Link className="nav-link" to="/profile">
                  My Accound
                </Link>
                <li className="nav-link text-white" onClick={props.logout}>
                  log out
                </li>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/">
                  Sign up
                </Link>
                <Link className="nav-link" to="/signin">
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
