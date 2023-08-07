// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import defaultImage from "../../assets/oops.jpg";
import Loading from "../Loading";

const Details = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setImageLoaded(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/products/${id}`
        );
        const data = await response.json();
        setImageLoaded(false);
        setError(null);
        setProduct(data.result);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Error occurred while fetching data", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container mt-1">
      <div className="row row-cols-1 row-cols-md-1 g-4 mt-5">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <span>Error: {error}</span>
        ) : product ? (
          <div className="col">
            <div className="card">
              {imageLoaded ? (
                <img src={defaultImage} alt="Default Image" />
              ) : (
                <img src={product.imageCover} alt={product.name} />
              )}

              <div className="card-body">
                <h5 className="card-title">{product?.name}</h5>
                <p>{product?.description}</p>
                <strong className="card-text">
                  Price: ${product?.price}
                  <span>, After Discount: {product?.priceAfterDiscount}</span>
                </strong>
                <br />
                <strong className="card-text m-0">Sold: {product?.sold}</strong>
                <strong className="card-text m-0">
                  Quantity: {product?.quantity}
                </strong>

                <div className="group-btns mt-3">
                  <button className="btn btn-add w-75">Add to Cart</button>
                  <button className="btn btn-love">
                    <AiOutlineHeart />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <span>No products available</span>
        )}
      </div>
    </div>
  );
};

export default Details;
