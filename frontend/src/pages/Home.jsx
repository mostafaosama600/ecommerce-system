// eslint-disable-next-line no-unused-vars
import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Content from "./Content";

const Home = () => {
  return (
    <div className="container-fluid mt-1">
      <Sidebar />
      <Content />
    </div>
  );
};

export default Home;
