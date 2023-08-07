// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const AddCategory = () => {
  const [category, setCategory] = useState({ name: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function getCategory(e) {
    setCategory({ ...category, [e.target.name]: e.target.value });
  }

  const formAddCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/v1/category/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
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
      <form onSubmit={formAddCategory}>
        sslsls
        <div className="col">
          <input
            type="text"
            value={category.name}
            onChange={getCategory}
            name="name"
          />
        </div>
        <button type="submit" className="btn btn-primary p-1 m-1">
          {loading ? "loading .." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
