
import React, { useState } from "react";
import { API_URL } from "../../Data/ApiPath";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState("no");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleCategoryChange = (event) => {
    const value = event.target.value;

    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleBestSeller = (event) => {
    setBestSeller(event.target.value);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const loginToken = localStorage.getItem("loginToken");
      const firmId = localStorage.getItem("firmId");

      if (!loginToken || !firmId) {
        alert("Please login and select a firm first!");
        return;
      }

      if (!image) {
        alert("Please select a product image!");
        return;
      }

      const formData = new FormData();

      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("bestSeller", bestSeller);
      formData.append("image", image);

      category.forEach((value) => {
        formData.append("category", value);
      });

      const response = await fetch(
        `${API_URL}/products/add-product/${firmId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || data.error || "Failed to add product");
        console.error("Add Product Error:", data);
        return;
      }

      console.log("Product Response:", data);
      alert(data.message || "Product added successfully!");

      setProductName("");
      setPrice("");
      setCategory([]);
      setBestSeller("no");
      setImage(null);
      setDescription("");
    } catch (error) {
      console.error("Add Product Error:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleAddProduct}>
        <h3>Add Product</h3>

        <label>Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />

        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          required
        />

        <div className="checkInp">
          <label>Category</label>

          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label>Veg</label>
              <input
                type="checkbox"
                value="veg"
                checked={category.includes("veg")}
                onChange={handleCategoryChange}
              />
            </div>

            <div className="checkboxContainer">
              <label>Non-Veg</label>
              <input
                type="checkbox"
                value="non-veg"
                checked={category.includes("non-veg")}
                onChange={handleCategoryChange}
              />
            </div>
          </div>
        </div>

        <div className="checkInp">
          <label>Best Seller</label>

          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label>Yes</label>
              <input
                type="radio"
                name="bestSeller"
                value="yes"
                checked={bestSeller === "yes"}
                onChange={handleBestSeller}
              />
            </div>

            <div className="checkboxContainer">
              <label>No</label>
              <input
                type="radio"
                name="bestSeller"
                value="no"
                checked={bestSeller === "no"}
                onChange={handleBestSeller}
              />
            </div>
          </div>
        </div>

        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Product Image</label>
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0] || null)}
          required
        />

        <br />

        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
