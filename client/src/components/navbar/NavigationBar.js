import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavDropdown } from "react-bootstrap";
import { logout } from "../../services/api";

const handleLogout = props => {
  logout().then(() => {
    props.setUser(null);
  });
};

const NavigationBar = props => {
  return (
    <Navbar
      style={{ backgroundColor: "#000", borderBottom: "2px solid #E7E7E7" }}
    >
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
      {props.user ? (
        <>
          <NavDropdown className="ml-auto main-navbar" title="Logout">
            <NavDropdown.Item
              onClick={() => handleLogout(props)}
              href="/"
              className="nav-dropdown"
            >
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </>
      ) : (
        <>
          <NavDropdown className="ml-auto main-navbar" title="Login/Signup">
            <NavDropdown.Item href="/login" className="nav-dropdown">
              Login
            </NavDropdown.Item>
            <NavDropdown.Item href="/signup" className="nav-dropdown">
              Signup
            </NavDropdown.Item>
          </NavDropdown>
        </>
      )}
    </Navbar>
  );
};

export default NavigationBar;
