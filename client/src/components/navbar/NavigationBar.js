import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavDropdown } from "react-bootstrap";

class NavigationBar extends Component {
  render() {
    return (
      <Navbar style={{ backgroundColor: "#000" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Navbar.Brand>
            <img
              src="/Background.png"
              width="35"
              height="35"
              className="d-inline-block align-top"
              alt="KarmaApp logo"
            />
          </Navbar.Brand>
        </Link>

        <NavDropdown className="ml-auto main-navbar" title="Login/Register">
          <NavDropdown.Item href="/login" className="nav-dropdown">
            {" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </NavDropdown.Item>

          <NavDropdown.Item href="/signup" className="nav-dropdown">
            {" "}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Register
            </Link>
          </NavDropdown.Item>
        </NavDropdown>
      </Navbar>
    );
  }
}

export default NavigationBar;
