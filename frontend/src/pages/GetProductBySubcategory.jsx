// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";

const GetProductBySubcategory = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { subcategoryId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/products/?subcategory=${subcategoryId}`
        );
        const data = await response.json();
        setProducts(data.result);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [subcategoryId]);

  return (
    <div className="container mt-5">
      <div className="row mt-5 row-cols-1 p-0 row-cols-md-3 g-4">
        {isLoading ? (
          <Loading />
        ) : products?.length > 0 ? (
          products.map((product, index) => (
            <div className="col" key={index}>
              <div className="card">
                <img src={product.imageCover} alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    Price :<b>${product.price}</b>, After Discount :
                    <b>${product.priceAfterDiscount}</b>
                  </p>
                  <Link to={`/details/${product._id}`}>details</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <span>No products available</span>
        )}
      </div>
    </div>
  );
};

export default GetProductBySubcategory;
