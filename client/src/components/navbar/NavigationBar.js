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
              className="nav-dropdown"
            >
              <Link to="/">Logout</Link>
            </NavDropdown.Item>
          </NavDropdown>
        </>
      ) : (
        <>
          <NavDropdown className="ml-auto main-navbar" title="Login/Signup">
            <NavDropdown.Item className="nav-dropdown">
              <Link to="/login">Login</Link>
            </NavDropdown.Item>
            <NavDropdown.Item className="nav-dropdown">
              <Link to="/signup">Signup</Link>
            </NavDropdown.Item>
          </NavDropdown>
        </>
      )}
    </Navbar>
  );
};

export default NavigationBar;
