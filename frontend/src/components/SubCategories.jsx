// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";

const SubCategories = () => {
  const [products, isLoading] = useFetch("subcategories");
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : products.length > 0 ? (
        products.map((product, index) => (
          <ul key={index} className="ul-sub-category">
            <li>
              <Link to={`get-product-by-subcategory/${product._id}`}>
                {product.name}
              </Link>
            </li>
          </ul>
        ))
      ) : (
        <span>No subcategories available </span>
      )}
    </>
  );
};

export default SubCategories;
