// import { useEffect, useState } from "react";
// import { API_URL } from "../Data/ApiPath";

// const AllProduct = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const productsHandler = async () => {
//     const firmId = localStorage.getItem("firmId");

//     if (!firmId) {
//       throw new Error("Firm ID not found in localStorage");
//     }

//     const response = await fetch(
//       `${API_URL}/products/get-products/${firmId}`
//     );

//     if (!response.ok) {
//       throw new Error(`API request failed: ${response.status}`);
//     }

//     const data = await response.json();

//     return Array.isArray(data) ? data : data.products || [];
//   };

//   useEffect(() => {
//     let isActive = true;

//     productsHandler()
//       .then((data) => {
//         if (isActive) {
//           setProducts(data);
//         }
//       })
//       .catch((error) => {
//         console.error("Failed to fetch products:", error);
//       })
//       .finally(() => {
//         if (isActive) {
//           setLoading(false);
//         }
//       });

//     return () => {
//       isActive = false;
//     };
//   }, []);

//   // Delete product
//   const deleteProductHandler = async (productId) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this product?"
//     );

//     if (!confirmDelete) return;

//     try {
//       const response = await fetch(
//         `${API_URL}/products/delete-product/${productId}`,
//         {
//           method: "DELETE",
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to delete product");
//       }

//       // Remove deleted product from the list
//       setProducts((prevProducts) =>
//         prevProducts.filter((item) => item._id !== productId)
//       );

//       alert("Product deleted successfully!");
//     } catch (error) {
//       console.error("Delete product error:", error);
//       alert(error.message || "Unable to delete product");
//     }
//   };

//   if (loading) {
//     return <p>Loading products...</p>;
//   }

//   return (
//     <div>
//       <h2>All Products</h2>

//       {!products ? (
//         <p>No Products Added</p>
//       ) : (
//         <table className="product table">
//           <thead>
//             <tr>
//               <th>Product Name</th>
//               <th>Price</th>
//               <th>Image</th>
//               <th>Description</th>
//               <th>Delete</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.map((item) => (
//               <tr key={item._id}>
//                 <td>{item.productName}</td>
//                 <td>{item.price}</td>

//                 <td>
//                   {item.image && (
//                     <img
//                       src={`${API_URL}/${item.image}`}
//                       alt={item.productName}
//                       style={{ width: 50, height: 50, objectFit: "cover" }}
//                     />
//                   )}
//                 </td>

//                 <td>{item.description}</td>

//                 <td>
//                   <button
//                     type="button"
//                     onClick={() => deleteProductHandler(item._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AllProduct;



import { useEffect, useState } from "react";
import { API_URL } from "../Data/ApiPath";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products using firmId
  const productsHandler = async () => {
    const firmId = localStorage.getItem("firmId");

    if (!firmId) {
      throw new Error(
        "Firm ID not found. Please login again and check your firm."
      );
    }

    const response = await fetch(
      `${API_URL}/products/get-products/${encodeURIComponent(firmId)}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `API request failed: ${response.status}`);
    }

    return Array.isArray(data)
      ? data
      : Array.isArray(data.products)
      ? data.products
      : [];
  };

  // Load products when component mounts
  useEffect(() => {
    let isActive = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await productsHandler();

        if (isActive) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);

        if (isActive) {
          setError(error.message || "Failed to load products");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isActive = false;
    };
  }, []);

  // Delete product
  const deleteProductHandler = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/products/delete-product/${encodeURIComponent(productId)}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      setProducts((prevProducts) =>
        prevProducts.filter((item) => item._id !== productId)
      );

      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Delete product error:", error);
      alert(error.message || "Unable to delete product");
    }
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return (
      <div>
        <h2>All Products</h2>
        <p>{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>All Products</h2>

      {products.length === 0 ? (
        <p>No Products Added</p>
      ) : (
        <table className="product table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Description</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>{item.price}</td>

                <td>
                  {item.image && (
                    <img
                      src={
                        item.image.startsWith("http")
                          ? item.image
                          : `${API_URL}/uploads/${item.image.replace(/^\/?(?:uploads\/)?/, "")}`
                      }
                      alt={item.productName || "Product"}
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                      }}
                    />
                  )}
                </td>

                <td>{item.description}</td>

                <td>
                  <button
                    type="button"
                    onClick={() => deleteProductHandler(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProduct;
