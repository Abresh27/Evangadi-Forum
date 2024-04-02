import React, { useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigationbar.css";
export default function Navigationbar() {
  //State to set the token in the local storage (Browser)
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <Link to="/forum">
              <img
                src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
                alt="Evangadi-logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link>
                <Link to="/forum" className="menu-link">
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="menu-link">How it works</Link>
              </Nav.Link>
              <Button className="sign-in-btn">
                <Link
                  className="sign-in-link"
                  to="/login"
                  onClick={() => {
                    // Handle sign-out logic
                    if (token) {
                      localStorage.removeItem("token");
                      setToken(null); // Update state immediately
                    } else {
                      // Handle sign-in logic
                      localStorage.setItem("token");
                      setToken("token"); // Update state immediately
                    }
                  }}
                >
                  {token ? "Log Out" : "Sign In"}
                </Link>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
