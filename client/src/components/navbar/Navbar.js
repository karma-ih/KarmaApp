import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="nav-style">
        <ul>
          <li>
            <Link to="/tasks" style={{ textDecoration: "none" }}>
              Tasks
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
