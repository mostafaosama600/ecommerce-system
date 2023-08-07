import { useEffect, useState } from "react";
const useFetch = (endPoint, currentPage) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setImageLoaded(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/${endPoint}`
        );
        const data = await response.json();
        setImageLoaded(false);
        setProducts(data.result);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [endPoint, currentPage]);
  return [products, isLoading, imageLoaded];
};
export default useFetch;
