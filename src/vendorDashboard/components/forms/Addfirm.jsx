

import { useState } from "react";
import { API_URL } from "../../Data/ApiPath";

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
  const [firmId, setFirmId] = useState(
    () => localStorage.getItem("firmId") || ""
  );
  const [replacementImage, setReplacementImage] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;

    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;

    setRegion((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage || null);
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

      console.log("Add Firm Response:", data);

      if (!response.ok) {
        if (
          data.message?.toLowerCase().includes("only one firm") ||
          data.message?.toLowerCase().includes("only 1 firm")
        ) {
          alert("Firm already exists! Only one firm can be added.");
        } else {
          alert(data.message || data.error || "Failed to add firm");
        }
        return;
      }

      // Backend response se Firm ID lo
      const firmId = data.firmId || data.firm?._id;

      if (!firmId) {
        console.error("Firm ID missing from backend response:", data);

        alert(
          "Firm response mil gaya, lekin Firm ID nahi mili. Console check karo."
        );
        return;
      }

      // Firm ID aur Firm Name save karo
      localStorage.setItem("firmId", String(firmId));
      localStorage.setItem("firmName", firmName);
      setFirmId(String(firmId));

      console.log("Saved Firm ID:", localStorage.getItem("firmId"));
      console.log("Saved Firm Name:", localStorage.getItem("firmName"));

      alert(data.message || "Firm added successfully!");

      // Form reset
      setFirmName("");
      setArea("");
      setCategory([]);
      setRegion([]);
      setOffer("");
      setFile(null);

      // File input ko reset karne ke liye form reset
      e.target.reset();
    } catch (error) {
      console.error("Add Firm Error:", error);
      alert("Something went wrong! Please check your server.");
    }
  };

  const handleFirmImageUpdate = async (e) => {
    e.preventDefault();

    const loginToken = localStorage.getItem("loginToken");
    if (!loginToken || !firmId) {
      alert("Please login again and make sure your firm is selected.");
      return;
    }

    if (!replacementImage) {
      alert("Please select an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", replacementImage);

      const response = await fetch(
        `${API_URL}/firms/update-image/${encodeURIComponent(firmId)}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
          body: formData,
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update firm image");
      }

      alert("Firm image updated. Refresh the restaurant page to see it.");
      setReplacementImage(null);
      e.target.reset();
    } catch (error) {
      console.error("Update Firm Image Error:", error);
      alert(error.message || "Failed to update firm image.");
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
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageUpload}
          required
        />

        <br />

        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>

      {firmId && (
        <form className="tableForm" onSubmit={handleFirmImageUpdate}>
          <h3>Replace Firm Image</h3>
          <label htmlFor="replacement-firm-image">Choose a new image</label>
          <input
            id="replacement-firm-image"
            type="file"
            name="image"
            accept="image/*"
            onChange={(event) =>
              setReplacementImage(event.target.files?.[0] || null)
            }
            required
          />
          <div className="btnSubmit">
            <button type="submit">Update Image</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddFirm;
