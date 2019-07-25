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
        <div style={style}>
          <Link style={{ color: "white" }} to="/tasks">
            Tasks
          </Link>
        </div>
      </div>
    );
  }
}

export default FooterBar;
