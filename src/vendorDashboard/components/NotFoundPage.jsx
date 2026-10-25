
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="errorSection">
      <Link to="/" style={{ fontSize: "18px" }}>
        <p>Go Back</p>
      </Link>

      <h1>404</h1>
      <div>Not Found</div>
    </div>
  );
};

export default NotFoundPage;
