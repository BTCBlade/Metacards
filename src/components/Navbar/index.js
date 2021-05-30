import Navbar from "react-bootstrap/Navbar";
import React from "react";
import logo from "./Metacards_logo.png";
import "./Navbar.css";

export default function Nav() {
  return (
    <Navbar bg="dark">
      <Navbar.Brand className="logo_container" href="/">
        <img
          src={logo}
          className="navbar_logo"
          alt="React Bootstrap logo"
        ></img>
        <h2 className="navbar_brand_text">Metacards</h2>
      </Navbar.Brand>
    </Navbar>
  );
}
