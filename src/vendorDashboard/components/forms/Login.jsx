

import { useState } from "react";
import { API_URL } from "../../data/ApiPath";

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

      if (!response.ok) {
        alert(data.message || "Login Failed");
        return;
      }

      if (!data.token || !data.vendorId) {
        throw new Error("Token or Vendor ID is missing");
      }

      // Step 2: Get vendor details
      const vendorResponse = await fetch(
        `${API_URL}/vendors/${encodeURIComponent(data.vendorId)}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      const vendorData = await vendorResponse.json();

      if (!vendorResponse.ok) {
        throw new Error(
          vendorData.message || "Failed to get vendor details"
        );
      }

      console.log("Vendor Details:", vendorData);

      // Step 3: Get firm ID and name
      const firmId = vendorData.vendorFirmId;

      const firmName =
        vendorData.vendor?.firm?.[0]?.firmName;

      // Step 4: Save all values in localStorage
      localStorage.setItem("loginToken", data.token);

      if (firmId && firmName) {
        localStorage.setItem("firmId", firmId);
        localStorage.setItem("firmName", firmName);
      } else {
        localStorage.removeItem("firmId");
        localStorage.removeItem("firmName");
      }

      console.log("Login Token:", localStorage.getItem("loginToken"));
      console.log("Firm ID:", localStorage.getItem("firmId"));
      console.log("Firm Name:", localStorage.getItem("firmName"));

      setEmail("");
      setPassword("");

      showWelcomeHandler();
      alert("Vendor Login success");

    } catch (error) {
      console.error("Login failed!", error);
      alert(error.message || "Login Failed");
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
