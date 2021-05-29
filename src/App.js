import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import IntakeFormPage from "./components/IntakeFormPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <IntakeFormPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
