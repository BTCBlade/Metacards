import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import IntakeForm from "./components/IntakeForm";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <h1>Metacards</h1>
          <IntakeForm />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
