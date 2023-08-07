<!-- // // eslint-disable-next-line no-unused-vars
// import React, { useState } from "react";
// import useFetch from "../hooks/useFetch";
// import Loading from "../components/Loading";

// const AddSubcategory = () => {
//   const [addNewSubcategory, setAddNewSubcategory] = useState({
//     name: "",
//     category: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   function getNewProduct(e) {
//     setAddNewSubcategory({
//       ...addNewSubcategory,
//       [e.target.name]: e.target.value,
//     });
//   }

//   const formAddBrand = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch(
//         "http://localhost:3000/api/v1/subcategories/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(addNewSubcategory),
//         }
//       );

//       if (response.ok) {
//         setLoading(false);
//       } else {
//         const errorData = await response.json();
//         setError(errorData.msg);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const [products, isLoading] = useFetch("categories", "GET");

//   const [selectedOption, setSelectedOption] = useState("");

//   const handleSelectChange = (e) => {
//     setSelectedOption(e.target.value);
//   };

//   return (
//     <div className="container">
//       {error && <div className="alert alert-danger">{error}</div>}

//       <form onSubmit={formAddBrand}>
//         <div className="col">
//           <input
//             type="text"
//             value={addNewSubcategory.name}
//             onChange={getNewProduct}
//             name="name"
//             placeholder="subcategory name"
//           />

//           <input
//             type="text"
//             value={selectedOption}
//             onChange={getNewProduct}
//             name="category"
//             placeholder={selectedOption}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary p-1 m-1">
//           {loading ? "loading .." : "Register"}
//         </button>
//       </form>

//       <select value={selectedOption} onChange={handleSelectChange}>
//         <option value="">se</option>
//         {isLoading ? (
//           <Loading />
//         ) : products?.length > 0 ? (
//           products.map((product, index) => (
//             <>
//               <option value={product._id} key={index}>
//                 {product.name}
//               </option>
//             </>
//           ))
//         ) : (
//           <span>No products available </span>
//         )}
//       </select>
//     </div>
//   );
// };

// export default AddSubcategory; -->
