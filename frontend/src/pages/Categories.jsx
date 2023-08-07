/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";
import SubCategories from "../components/SubCategories";

const Categories = () => {
  const [products, isLoading] = useFetch("categories");
  return (
    <>
      <div className="container mt-5">
        <div className="row mt-5 row-cols-1 p-0 row-cols-md-3 g-4">
          {isLoading ? (
            <Loading />
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <div className="col" key={index}>
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <span className="m-0 p-0">{product.name}</span>
                      <img src={product.image} width={50} alt="" />
                    </div>
                    <SubCategories />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span>No products available </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;
