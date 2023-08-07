// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Loading from "../components/Loading";
import ReactPaginate from "react-paginate";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Brands = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/brands?page=${currentPage}`
        );
        const data = await response.json();
        setProducts(data.result);
        setTotalPages(data.totalPages);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };
  const pageCount = Math.ceil(totalPages);

  return (
    <div className="container mt-5">
      <div className="row mt-5 row-cols-1 p-0 row-cols-md-3 g-4">
        <>
          {isLoading ? (
            <Loading />
          ) : products?.length > 0 ? (
            products.map((product, index) => (
              <div className="col" key={index}>
                <div className="card">
                  <div className="card-body">
                    <Link to={`/get-product-by-brand/${product._id}`}>
                      <span>{product.name}</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span>No products available </span>
          )}
        </>
      </div>
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        pageCount={pageCount || 2}
        breakLabel={"...."}
        marginPagesDisplayed={1}
        containerClassName={"pagination justify-content-center my-4"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Brands;
