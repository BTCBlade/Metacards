import React, { useEffect } from "react";
import IntakeForm from "../IntakeForm";

import Container from "react-bootstrap/Container";
import "./IntakeFormPage.css";

export default function IntakeFormPage() {
  return (
    <Container className="IntakeFormPage-Main">
      <IntakeForm />
    </Container>
  );
}
