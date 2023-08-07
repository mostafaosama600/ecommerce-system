// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Style.css";
import Product from "../components/Products/Product";

const Content = () => {
  return (
    <div className="content-page my-5">
      <div className="container my-5 p-1">
        <Product />
      </div>
    </div>
  );
};

export default Content;
