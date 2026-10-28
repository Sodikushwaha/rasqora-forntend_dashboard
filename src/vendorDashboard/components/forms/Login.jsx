
import { useState } from "react";
import { API_URL } from "../../Data/ApiPath";
import { getVendorIdFromToken } from "../../helpers/auth";

export const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Vendor login
      const response = await fetch(`${API_URL}/vendors/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log("Login response:", data);

      if (!response.ok) {
        throw new Error(data?.message || "Login failed");
      }

      // Step 2: Get token
      const token = data?.token;

      if (!token) {
        throw new Error("Login response is missing authentication token");
      }

      // Step 3: Get vendor ID from response or token
      const vendorId =
        data?.vendorId ||
        data?.vendor?._id ||
        getVendorIdFromToken(token);

      if (!vendorId) {
        throw new Error(
          "Vendor ID not found. Please check your backend login response."
        );
      }

      // Step 4: Fetch vendor details
      const vendorResponse = await fetch(
        `${API_URL}/vendors/${encodeURIComponent(vendorId)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const vendorData = await vendorResponse.json();

      console.log("Vendor details response:", vendorData);

      if (!vendorResponse.ok) {
        throw new Error(
          vendorData?.message || "Failed to fetch vendor details"
        );
      }

      // Step 5: Find firm details from response
      const firm =
        vendorData?.vendor?.firm?.[0] ||
        vendorData?.firm?.[0] ||
        vendorData?.vendor?.firm ||
        vendorData?.firm ||
        null;

      const firmId =
        data?.firmId ||
        vendorData?.vendorFirmId ||
        (typeof firm === "object" ? firm?._id : firm) ||
        null;

      const firmName =
        data?.firmName ||
        (typeof firm === "object" ? firm?.firmName : null) ||
        null;

      // Step 6: Save login details
      localStorage.setItem("loginToken", token);
      localStorage.setItem("vendorId", String(vendorId));

      if (firmId) {
        localStorage.setItem("firmId", String(firmId));
      } else {
        localStorage.removeItem("firmId");
      }

      if (firmName) {
        localStorage.setItem("firmName", firmName);
      } else {
        localStorage.removeItem("firmName");
      }



      setEmail("");
      setPassword("");

      showWelcomeHandler();
      alert("Vendor login successful");

    } catch (error) {
      console.error("Login failed:", error);
      alert(error.message || "Login failed");
    }
  };

  return (
    <div className="loginSection">
      <form className="authForm" onSubmit={loginHandler}>
        <h3>Vendor Login</h3>

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <br />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        <br />

        <div className="btnSubmit">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
