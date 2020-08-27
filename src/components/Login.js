import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import useConnection from "../utils/connection";
import { AuthSetContext } from "../utils/auth";

export default function Login() {
  const connection = useConnection();
  const [currentError, setCurrentError] = useState("");
  const setAuth = useContext(AuthSetContext);

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      {currentError !== "" ? (
        <Alert variant="danger">{currentError}</Alert>
      ) : null}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          connection({
            method: "post",
            url: "/auth/login",
            data: {
              email: e.target.email.value,
              password: e.target.password.value,
            },
          })
            .then((response) => {
              console.log(response);
              setAuth({
                loggedIn: true,
                token: response.data.data.token,
              });
            })
            .catch((err) => {
              console.log(err.response);
              setCurrentError(err.response.data.message);
              setAuth({
                loggedIn: false,
                token: "",
              });
            });
        }}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
