import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavDropdown } from "react-bootstrap";
import { logout } from "../../services/api";
import { LinkContainer } from "react-router-bootstrap";

const handleLogout = props => {
  logout().then(() => {
    props.setUser(null);
  });
};

const NavigationBar = props => {
  return (
    <Navbar
      style={{
        backgroundColor: "#000",
        zIndex: 99,
        borderBottom: "2px solid #E7E7E7"
      }}
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
      {/* Dominik: somebody please change the design of this */}
      {props.user ? (
        <h3 style={{ color: "orange", marginTop: "10px" }}>
          {props.user.karma}
        </h3>
      ) : (
        <></>
      )}
      {props.user ? (
        <>
          <NavDropdown className="ml-auto main-navbar" title="Logout">
            <LinkContainer to="/">
              <NavDropdown.Item
                onClick={() => handleLogout(props)}
                className="nav-dropdown"
              >
                Logout
              </NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </>
      ) : (
        <>
          <NavDropdown className="ml-auto main-navbar" title="Login/Signup">
            <LinkContainer to="/login">
              <NavDropdown.Item className="nav-dropdown">
                Login
              </NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/signup">
              <NavDropdown.Item className="nav-dropdown">
                Signup
              </NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </>
      )}
    </Navbar>
  );
};

export default NavigationBar;
