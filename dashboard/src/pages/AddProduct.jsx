// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Loading from "../components/Loading";
import useFetch from "../hooks/useFetch.js";

const AddProduct = () => {
  const [addNewProduct, setAddNewProduct] = useState({
    name: "",
    description: "",
    priceAfterDiscount: "",
    price: "",
    subcategory: "",
    category: "",
    brand: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function getNewProduct(e) {
    setAddNewProduct({ ...addNewProduct, [e.target.name]: e.target.value });
  }

  const formSubmitProductInformation = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/v1/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addNewProduct),
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

  const [subcategories, isLoading] = useFetch("subcategories", "GET");
  const [categories] = useFetch("categories", "GET");
  const [brands] = useFetch("brands", "GET");

  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={formSubmitProductInformation}>
        <div className="col">
          <input
            type="text"
            value={addNewProduct.name}
            onChange={getNewProduct}
            name="name"
            placeholder="product name"
          />
          <input
            type="text"
            value={addNewProduct.description}
            onChange={getNewProduct}
            name="description"
            placeholder="product description"
          />
          <input
            type="text"
            value={addNewProduct.priceAfterDiscount}
            onChange={getNewProduct}
            name="priceAfterDiscount"
            placeholder="product price after discount"
          />
          <input
            type="text"
            value={addNewProduct.price}
            onChange={getNewProduct}
            name="price"
            placeholder="product price"
          />
          <select>
            <option value="">Select subcategory</option>
            {isLoading ? (
              <Loading />
            ) : subcategories?.length > 0 ? (
              subcategories.map((subcategory, index) => (
                <option key={index} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))
            ) : (
              <option disabled>No subcategories available</option>
            )}
          </select>
          <select>
            <option value="">Select categories</option>
            {isLoading ? (
              <Loading />
            ) : categories?.length > 0 ? (
              categories.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))
            ) : (
              <option disabled>No categories available</option>
            )}
          </select>
          <select>
            <option value="">Select brands</option>
            {isLoading ? (
              <Loading />
            ) : brands?.length > 0 ? (
              brands.map((brand, index) => (
                <option key={index} value={brand._id}>
                  {brand.name}
                </option>
              ))
            ) : (
              <option disabled>No brands available</option>
            )}
          </select>
        </div>
        <button type="submit" className="btn btn-primary p-1 m-1">
          {loading ? "loading .." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
