/* eslint-disable react/prop-types */
import React, { createContext } from "react";
import useFetch from "../hooks/useFetch";
export const CounterContext = createContext(0);

const CounterContextProvider = (props) => {
  const [products] = useFetch("products");

  const [selectedColor, setSelectedColor] = React.useState("all");
  const [sorting, setSorting] = React.useState("all");

  // start handle colors change
  const colors = [...new Set(products.map((product) => product.colors).flat())];
  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };
  const filteredProducts =
    selectedColor !== "all"
      ? products.filter((product) => product.colors.includes(selectedColor))
      : products;

  // start handle price change
  const handlePriceSort = (event) => {
    setSorting(event.target.value);
  };

  let updatedProducts = [...filteredProducts];
  const filterByPrice = (updatedProducts, minPrice, maxPrice) => {
    return updatedProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  };

  if (sorting === "lowest prices") {
    updatedProducts = filterByPrice(updatedProducts, 0, 600);
  } else if (sorting === "highest prices") {
    updatedProducts = filterByPrice(updatedProducts, 601, Infinity);
  }

  const value = {
    colors,
    selectedColor,
    handleColorChange,
    handlePriceSort,
    filteredProducts: updatedProducts,
  };

  return (
    <CounterContext.Provider value={value}>
      {props.children}
    </CounterContext.Provider>
  );
};

export default CounterContextProvider;
