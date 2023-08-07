// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import "../Style.css";
import { CounterContext } from "../../context/store";

//
const Sidebar = () => {
  const { handleColorChange, selectedColor, colors, handlePriceSort } =
    useContext(CounterContext);

  return (
    <div className="sidebar">
      <div className="container mt-5">
        <div className="mb-2">
          <span>Colors</span>
          <select
            className="my-2 w-100"
            value={selectedColor}
            onChange={handleColorChange}
          >
            <option value="all">All Colors</option>
            {colors.map((color, index) => (
              <option value={color} key={index}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <span>Prices</span>
          <select className="my-2 w-100" onChange={handlePriceSort}>
            <option value="all prices">All Prices</option>
            <option value="highest prices">Highest price</option>
            <option value="lowest prices">Lowest price</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
