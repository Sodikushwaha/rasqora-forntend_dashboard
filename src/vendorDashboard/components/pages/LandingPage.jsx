import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import Login from "../forms/Login";
import { Register } from "../forms/Register";
import Addfirm from "../forms/Addfirm";
import AddProduct from "../forms/AddProduct";
import Welcome from "../Welcome";
import AllProducts from "../AllProduct";


function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProduct, setShowAllProduct] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      setShowLogOut(true);
    }
  }, []);

  useEffect(() => {
    const firmName = localStorage.getItem("firmName");
    if (firmName) {
      setShowFirmTitle(false);
    }
  }, []);

  const showLogOutHandler = () => {
    confirm("Are you sure to logout ?");
    localStorage.removeItem("loginToken");
    localStorage.removeItem("vendorId");
    localStorage.removeItem("firmId");
    localStorage.removeItem("firmName");

    setShowLogOut(false);
  };

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProduct(false);
    
  };

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProduct(false);
  };
  const showFirmHandler = () => {
    if (showLogOut) {
      setShowLogin(false);
      setShowRegister(false);
      setShowFirm(true);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProduct(false);
    } else {
      alert("Please Login");
      setShowLogin(true);
    }
  };

  // const showProductHandler = () => {
  //   if (showLogOut) {
  //     setShowProduct(true);
  //     setShowRegister(false);
  //     setShowFirm(false);
  //     setShowLogin(false);
  //     setShowWelcome(false);
  //     setShowAllProduct(false);
  //   } else {
  //     alert("please Login");
  //     setShowLogOut(true);
  //   }
  // };


const showProductHandler = () => {
  if (showLogOut) {
    setShowProduct(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowLogin(false);
    setShowWelcome(false);
    setShowAllProduct(false);
  } else {
    alert("Please Login First");
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProduct(false);
  }
};

  const showWelcomeHandler = () => {
    setShowProduct(false);
    setShowRegister(false);
    setShowFirm(false);
    setShowLogin(false);
    setShowWelcome(true);
    setShowAllProduct(false);
  };

  // const showAllProductHandler = () => {
  //   if (showLogOut) {
  //     setShowProduct(false);
  //     setShowRegister(false);
  //     setShowFirm(false);
  //     setShowLogin(false);
  //     setShowWelcome(false);
  //     setShowAllProduct(true);
  //   } else {
  //     alert("please Login");
  //     setShowLogOut(true);
  //   }
  // };

const showAllProductHandler = () => {
  if (showLogOut) {
    setShowProduct(false);
    setShowRegister(false);
    setShowFirm(false);
    setShowLogin(false);
    setShowWelcome(false);
    setShowAllProduct(true);
  } else {
    alert("Please Login First");
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProduct(false);
  }
};  


  return (
    <div>
      <section className="landingSection">
        <NavBar
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
          showLogOut={showLogOut}
          showLogOutHandler={showLogOutHandler}
        />
        <div className="collectionSection">
          <SideBar
            showFirmHandler={showFirmHandler}
            showProductHandler={showProductHandler}
            showAllProductHandler={showAllProductHandler}
            showFirmTitle={showFirmTitle}
          />
          {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
          {showFirm && showLogOut && <Addfirm />}
          {showProduct && showLogOut && <AddProduct />}
          {showAllProduct && showLogOut && <AllProducts />}
          {showWelcome && <Welcome />}
          {/* <AddProduct /> */}
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
