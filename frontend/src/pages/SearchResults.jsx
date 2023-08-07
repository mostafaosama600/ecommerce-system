import useFilter from "../hooks/useFilter";
import Loading from "../components/Loading";

const SearchResults = () => {
  const [filteredProducts, query, isLoading] = useFilter();

  const highlightQuery = (text) => {
    const regex = new RegExp(query, "i");
    return text.replace(
      regex,
      (match) => `<span style="background: blue">${match}</span>`
    );
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row mt-5 row-cols-1 p-0 row-cols-md-3 g-4">
          {isLoading ? (
            <Loading />
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div className="col" key={index}>
                <div className="card">
                  <img src={product.imageCover} alt={product.name} />
                  <div className="card-body">
                    <h5
                      className="card-title"
                      dangerouslySetInnerHTML={{
                        __html: highlightQuery(product.name),
                      }}
                    />
                    <p
                      className="card-text"
                      dangerouslySetInnerHTML={{
                        __html: highlightQuery(product.description),
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span>No results available</span>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
