import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./services/auth";

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
