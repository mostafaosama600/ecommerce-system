// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import CounterContextProvider from "./context/store";
import { Routes, Route, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import ProtectedRoutes from "./hooks/ProtectedRoutes";
import Navbar from "./components/Navbar";
import AddBrand from "./pages/AddBrand";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import AddProduct from "./pages/AddProduct";
import Home from "./pages/Home";
import AddCategory from "./pages/AddCategory";
import AddSubcategory from "./pages/AddSubcategory";

function App() {
  let [loginUser, setLoginUser] = useState(null);
  const navigate = useNavigate();

  function getUserInfo() {
    let encodedToken = localStorage.getItem("userToken");
    let userData = jwtDecode(encodedToken);
    setLoginUser(userData);
  }

  function logout() {
    localStorage.removeItem("userToken");
    setLoginUser(null);
    navigate("/");
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) getUserInfo();
  }, []);

  return (
    <>
      <div className="container my-5">
        <br />
        <CounterContextProvider>
          <Navbar loginUser={loginUser} logout={logout} />

          <Routes>
            <Route
              path="/admin-page"
              element={
                <ProtectedRoutes>
                  <Home />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/add-product"
              element={
                <ProtectedRoutes>
                  <AddProduct />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/add-brand"
              element={
                <ProtectedRoutes>
                  <AddBrand />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/add-category"
              element={
                <ProtectedRoutes>
                  <AddCategory />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/add-subcategory"
              element={
                <ProtectedRoutes>
                  <AddSubcategory />
                </ProtectedRoutes>
              }
            />
            <Route path="/" element={<Signin getUserInfo={getUserInfo} />} />
            <Route
              path="/create-account"
              element={
                <ProtectedRoutes>
                  <Signup />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/profile-admin"
              element={
                <ProtectedRoutes>
                  <Profile loginUser={loginUser} setLoginUser={setLoginUser} />
                </ProtectedRoutes>
              }
            />
            <Route
              path="*"
              element={
                <ProtectedRoutes>
                  <PageNotFound />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </CounterContextProvider>
      </div>
    </>
  );
}

export default App;
