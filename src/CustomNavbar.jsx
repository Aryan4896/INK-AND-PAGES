import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import logo from "./final22.png";

const CustomNavbar = () => {
  return (
    <Navbar bg="secondary" variant="light" expand="lg">
      <div className="container-fluid">
        <Navbar.Brand href="#" className="text-light">
          <img
            src={logo}
            style={{ height: "50px", width: "75px" }}
            className="register-logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNavDropdown" className="bg-light" />
        <Navbar.Collapse id="navbarNavDropdown">
          <Nav className="navbar-nav">
            <Nav.Link href="/" active className="text-light">
              Home
            </Nav.Link>
            <Nav.Link href="/list" className="text-light">
              Add listing
            </Nav.Link>
            {/* <Nav.Link href="/orders" className="text-light">
             Orders
            </Nav.Link> */}
            {/* <Nav.Link href="#" className="text-light">
              Pricing
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default CustomNavbar;
