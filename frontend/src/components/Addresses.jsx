/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const Addresses = ({ loginUser }) => {
  console.log(loginUser?.userId);

  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/users/${loginUser?.userId}`
        );
        const data = await response.json();
        setProducts(data.result);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, [loginUser?.userId]);

  return (
    <div className="row mt-5 row-cols-1 p-0 row-cols-md-3 g-4">
      <>
        {isLoading ? (
          <Loading />
        ) : products && products.addresses?.length > 0 ? (
          products.addresses.map((address, index) => (
            <div className="col" key={index}>
              <div className="card">
                <div className="card-body">
                  <ul>
                    <li>your name: {address.name}</li>
                    <li>your address: {address.street}</li>
                    <li>your city: {address.city}</li>
                    <li>your country: {address.country}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <span>No addresses have been added</span>
        )}
      </>
    </div>
  );
};

export default Addresses;
