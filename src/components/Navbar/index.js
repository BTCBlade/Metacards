import Navbar from "react-bootstrap/Navbar";
import React from "react";
import logo from "./Metacards_logo.png";
import "./Navbar.css";

export default function Nav() {
  return (
    <Navbar bg="dark">
      <Navbar.Brand href="/">
        <img
          src={logo}
          className="navbar_logo"
          alt="React Bootstrap logo"
        ></img>
      </Navbar.Brand>
    </Navbar>
  );
}
