// eslint-disable-next-line no-unused-vars
import useFetch from "./useFetch";
import { useParams } from "react-router-dom";

const useFilter = () => {
  const [products, isLoading] = useFetch("products");
  const { query } = useParams();

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
  );
  return [filteredProducts, query, isLoading];
};

export default useFilter;
