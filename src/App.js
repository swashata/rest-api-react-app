import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { AuthSetContext, AuthStateContext } from "./utils/auth";
import Login from "./components/Login";
import { ConnectionContext, connection } from "./utils/connection";

function App() {
  const [auth, setAuth] = useState({ loggedIn: false, token: "" });

  // useEffect(() => {
  //   connection.defaults.headers.common[
  //     "Authorization"
  //   ] = `Bearer ${auth.token}`;
  // }, [auth.token]);

  return (
    <Router>
      <ConnectionContext.Provider value={connection}>
        <AuthStateContext.Provider value={auth}>
          <AuthSetContext.Provider value={setAuth}>
            <Navbar bg="light" expand="lg">
              <Navbar.Brand>
                <Link to="/">Book Management</Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav style={{ marginLeft: "auto" }}>
                  {auth.loggedIn ? (
                    <Nav.Item>
                      <Link className="nav-link" to="/list">
                        Book List
                      </Link>
                    </Nav.Item>
                  ) : (
                    <>
                      <Nav.Item>
                        <Link className="nav-link" to="/login">
                          Login
                        </Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Link className="nav-link" to="/signup">
                          Sign Up
                        </Link>
                      </Nav.Item>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Container style={{ padding: "20px" }}>
              {auth.loggedIn ? <>Hello World</> : <Login />}
            </Container>
          </AuthSetContext.Provider>
        </AuthStateContext.Provider>
      </ConnectionContext.Provider>
    </Router>
  );
}

export default App;
