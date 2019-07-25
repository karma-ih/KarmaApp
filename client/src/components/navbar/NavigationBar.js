import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavigationBar extends Component {
  render() {
    return (
      <nav className="nav-style">
        <ul>
          <li>
            <Link to="/tasks" style={{ textDecoration: "none" }}>
              Tasks
            </Link>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Sign Up
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              Log In
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavigationBar;
