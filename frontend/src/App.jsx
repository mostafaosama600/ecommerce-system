// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import CounterContextProvider from "./context/store";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";
import Details from "./components/Products/Details";
import SearchResults from "./pages/SearchResults";
import PageNotFound from "./pages/PageNotFound";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import ProtectedRoutes from "./hooks/ProtectedRoutes";
import GetProductBySubcategory from "./pages/GetProductBySubcategory";
import GetProductByBrand from "./pages/GetProductByBrand";

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
    navigate("/signin");
  }
  useEffect(() => {
    if (localStorage.getItem("userToken")) getUserInfo();
  }, []);

  return (
    <>
      <CounterContextProvider>
        <Navbar loginUser={loginUser} logout={logout} />

        <Routes>
          <Route
            path="/products"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/details/:id"
            element={
              <ProtectedRoutes>
                <Details />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/search/:query"
            element={
              <ProtectedRoutes>
                <SearchResults />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoutes>
                <Categories />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/brands"
            element={
              <ProtectedRoutes>
                <Brands />
              </ProtectedRoutes>
            }
          />
          <Route path="/" element={<Signup />} />
          <Route
            path="/signin"
            element={<Signin getUserInfo={getUserInfo} />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile loginUser={loginUser} />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/get-product-by-brand/:brandId"
            element={
              <ProtectedRoutes>
                <GetProductByBrand />
              </ProtectedRoutes>
            }
          />
          <Route
            path="categories/get-product-by-subcategory/:subcategoryId"
            element={
              <ProtectedRoutes>
                <GetProductBySubcategory />
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
    </>
  );
}

export default App;
