
// import React, {useState} from 'react'

// const  NavBar = ({showLoginHandler , showRegisterHandler, showLogOut , showLogOutHandler}) => {
//   const firmName  = localStorage.getItem('firmName');
//   return (
//     <div
//       className="navbarSection"
//     >
//       <div className="company">
//         Vendor Dashboard
//       </div>
//       <div className='company'> 
//         <h4>FirmName : {firmName}</h4>
//       </div>

//       <div className="userAuth ">
//         {!showLogOut ? <>
//         <span onClick={showLoginHandler}>Login /</span>
//         <span  onClick= {showRegisterHandler}>Register</span>
//         </>: <span onClick={showLogOutHandler} >Logout</span>}
//       </div>
//     </div>
//   )
// }

// export default NavBar


import React from "react";

const NavBar = ({
  showLoginHandler,
  showRegisterHandler,
  showLogOut,
  showLogOutHandler,
}) => {
  const firmName = localStorage.getItem("firmName");

  return (
    <div className="navbarSection">
      <div className="company">
        Vendor Dashboard
      </div>

      <div className="company">
        <h4>FirmName : {firmName || ""}</h4>
      </div>

      <div className="userAuth">
        {!showLogOut ? (
          <>
            <span onClick={showLoginHandler}>Login / </span>
            <span onClick={showRegisterHandler}>Register</span>
          </>
        ) : (
          <span onClick={showLogOutHandler}>Logout</span>
        )}
      </div>
    </div>
  );
};

export default NavBar;