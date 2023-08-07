import { useEffect, useState } from "react";

const useFetch = (endPoint, method) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/${endPoint}`,
          {
            method: `${method}`,
            headers: {
              "Content-Type": "application/json",
            },
          }
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
  }, [endPoint, method]);

  return [products, isLoading];
};

export default useFetch;
