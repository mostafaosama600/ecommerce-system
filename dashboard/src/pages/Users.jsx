// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/users`);
        const data = await response.json();
        setUsers(data.result);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container mt-5">
      <div className="row mt-5 row-cols-1 p-0 row-cols-md-3 g-4">
        <>
          {isLoading ? (
            <Loading />
          ) : users?.length > 0 ? (
            users.map((user, index) => (
              <div className="col" key={index}>
                <div className="card">
                  <div className="card-body">
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                    <p>{user.role}</p>
                    <p>{user.isActive}</p>
                    <p>{user.createdAt.slice(0, 10)}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span>No products available </span>
          )}
        </>
      </div>
    </div>
  );
};

export default Users;
