import React from "react";
import { Link } from "react-router-dom";

var style = {
  backgroundColor: "rgba(0, 0, 0, 1)",
  color: "white",
  borderTop: "2px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "60px",
  width: "100%",
  zIndex: "99"
};

var phantom = {
  display: "block",
  padding: "20px",
  height: "60px",
  width: "100%"
};

const AppBar = () => {
  return (
    <div>
      <div style={phantom} />
      <div className="footer-icons-wrapper" style={style}>
        <Link style={{ color: "white" }} to="/">
          <i className="fas footer-icons fa-home" />
        </Link>
        <Link style={{ color: "white" }} to="/market">
          <i className="fas footer-icons fa-store" />
        </Link>
        <Link style={{ color: "white" }} to="/market/post">
          <i className="far footer-icons fa-plus-square" />
        </Link>
        <Link style={{ color: "white" }} to="/map">
          <i className="fas footer-icons fa-map" />
        </Link>
        <Link style={{ color: "white" }} to="/profile">
          <i className="fas footer-icons fa-user" />
        </Link>
      </div>
    </div>
  );
};

export default AppBar;
