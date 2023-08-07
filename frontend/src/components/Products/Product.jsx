// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import "../Style.css";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import defaultImage from "../../assets/oops.jpg";
import { CounterContext } from "../../context/store";
import useFetch from "../../hooks/useFetch";

const Product = () => {
  const [imageLoaded, isLoading] = useFetch();
  const { filteredProducts } = useContext(CounterContext);
  return (
    <>
      <div className="row row-cols-1 p-0 row-cols-md-4 g-2">
        {isLoading ? (
          <Loading />
        ) : filteredProducts?.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div className="col" key={index}>
              <div className="card">
                {imageLoaded ? (
                  <img src={defaultImage} alt="Default Image" />
                ) : (
                  <img src={product.imageCover} alt={product.name} />
                )}
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    Price :<b>${product.price}</b>, After Discount :
                    <b>${product.priceAfterDiscount}</b>
                  </p>
                  <p className="card-text">
                    quantity : <b>{product.quantity}</b>, Sold :
                    <b>{product.sold}</b>
                  </p>
                  <p className="card-text mt-3">
                    Colors:
                    {product.colors.map((color, index) => (
                      <span
                        key={index}
                        className="resit-colors"
                        style={{ background: color }}
                      ></span>
                    ))}
                  </p>

                  <div className="groub-btns mt-3">
                    <button className="btn btn-add w-75">add to card</button>
                    <Link
                      to={`/details/${product._id}`}
                      className="btn btn-details"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <span>No products available </span>
        )}
      </div>
    </>
  );
};

export default Product;
