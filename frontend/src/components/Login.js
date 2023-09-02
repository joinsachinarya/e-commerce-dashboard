import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Container, Form, Alert } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      setError("Please enter correct details");
    }
  };

  return (
    <Container className="log-in-container mt-4 w-25">
      <Card className="p-3">
        <Card.Title className="mb-2">Login</Card.Title>
        <Form className="log-in-form">
          <Form.Group className="mt-3" controlId="email">
            <Form.Control
              className=""
              name="email"
              type="text"
              placeholder="Email"
              onChange={(e) => {
                setError(null);
                setEmail(e.target.value);
              }}
              value={email}
            />
          </Form.Group>
          <Form.Group className="mt-3" controlId="password">
            <Form.Control
              className=""
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setError(null);
                setPassword(e.target.value);
              }}
              value={password}
            />
          </Form.Group>
          {error ? (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          ) : null}
          <Button onClick={handleLogin} className="bg-info mt-3" type="submit">
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
