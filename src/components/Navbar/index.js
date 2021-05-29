import Navbar from "react-bootstrap/Navbar";
import React from "react";

export default function Nav() {
  return (
    <Navbar bg="dark">
      <Navbar.Brand href="/">
        <img
          src="/Metacards_logo.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        ></img>
      </Navbar.Brand>
    </Navbar>
  );
}
