import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import IntakeForm

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <h1>Metacards</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
