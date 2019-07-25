import React, { Component } from "react";
import { Link } from "react-router-dom";
var style = {
  backgroundColor: "#000",
  color: "white",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "60px",
  width: "100%"
};

var phantom = {
  display: "block",
  padding: "20px",
  height: "60px",
  width: "100%"
};

class FooterBar extends Component {
  render() {
    return (
      <div>
        <div style={phantom} />
        <div class="footer-icons-wrapper" style={style}>
          <Link style={{ color: "white" }} to="/">
            <i class="fas footer-icons fa-home" />
          </Link>
          <Link style={{ color: "white" }} to="/tasks">
            <i class="fas footer-icons fa-store" />
          </Link>
          <Link style={{ color: "white" }} to="/">
            <i class="far footer-icons fa-plus-square" />
          </Link>
          <Link style={{ color: "white" }} to="/">
            <i class="fas footer-icons fa-map" />
          </Link>
          <Link style={{ color: "white" }} to="/">
            <i class="fas footer-icons fa-user" />
          </Link>
        </div>
      </div>
    );
  }
}

export default FooterBar;
