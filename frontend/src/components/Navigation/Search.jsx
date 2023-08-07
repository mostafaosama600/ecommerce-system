/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchQueryHandler = (e) => {
    e.preventDefault();
    navigate(`search/${query}`);
  };

  return (
    <form className="d-flex w-50" onSubmit={searchQueryHandler}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn btn-outline-success">Search</button>
    </form>
  );
};

export default Search;
