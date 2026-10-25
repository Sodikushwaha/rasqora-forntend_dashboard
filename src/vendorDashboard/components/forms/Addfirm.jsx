import React, { useState, useRef } from "react";
import { API_URL } from "../../Data/ApiPath";

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
  // const fileInputRef = useRef(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;

    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;

    setRegion((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const handleImageUpload = (event) => {
    const selectImage = event.target.files[0];
    setFile(selectImage);
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginToken = localStorage.getItem("loginToken");

      if (!loginToken) {
        alert("Please login first!");
        return;
      }

      const formData = new FormData();

      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("offer", offer);

      category.forEach((value) => {
        formData.append("category", value);
      });

      region.forEach((value) => {
        formData.append("region", value);
      });

      if (file) {
        formData.append("image", file);
      }

      const response = await fetch(`${API_URL}/firms/add-firm`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message === "Vendor can have only one firm") {
          alert("Firm Exists! Only 1 firm can be added.");
        } else {
          alert(data.message || "Failed to add firm");
        }
        return;
      }

      alert(data.message || "Firm added successfully!");

      setFirmName("");
      setArea("");
      setCategory([]);
      setRegion([]);
      setOffer("");
      setFile(null);

      console.log(data.firmId);

      if (data.firmId) {
        localStorage.setItem("firmId", data.firmId);
        localStorage.setItem("firmName", firmName);
      }

      setFirmName("");
      setArea("");
      setCategory([]);
      setRegion([]);
      setOffer("");
      setFile(null);
    } catch (error) {
      console.error("Add Firm Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h3>Add Firm</h3>

        <label>Firm Name</label>
        <input
          type="text"
          name="firmName"
          value={firmName}
          onChange={(e) => setFirmName(e.target.value)}
          required
        />

        <label>Area</label>
        <input
          type="text"
          name="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
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

        <label>Offer</label>
        <input
          type="text"
          name="offer"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        />

        <div className="checkInp">
          <label>Region</label>

          <div className="inputsContainer">
            <div className="regBoxContainer">
              <label>South Indian</label>
              <input
                type="checkbox"
                value="south-india"
                checked={region.includes("south-india")}
                onChange={handleRegionChange}
              />
            </div>

            <div className="regBoxContainer">
              <label>North Indian</label>
              <input
                type="checkbox"
                value="north-india"
                checked={region.includes("north-india")}
                onChange={handleRegionChange}
              />
            </div>

            <div className="regBoxContainer">
              <label>Chinese</label>
              <input
                type="checkbox"
                value="chinese"
                checked={region.includes("chinese")}
                onChange={handleRegionChange}
              />
            </div>

            <div className="regBoxContainer">
              <label>Bakery</label>
              <input
                type="checkbox"
                value="bakery"
                checked={region.includes("bakery")}
                onChange={handleRegionChange}
              />
            </div>
          </div>
        </div>

        <label>Firm Image</label>
        <input type="file" onChange={handleImageUpload} required />

        <br />

        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddFirm;
