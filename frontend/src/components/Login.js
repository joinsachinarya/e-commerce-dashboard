import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleLogIn(e) {
    e.preventDefault();
    console.log(email, password);
  }

  return (
    <Container className="log-in-container mt-4 w-25">
      <Card className="p-3">
        <Card.Title className="mb-2">Log In</Card.Title>
        <Form className="log-in-form">
          <Form.Group className="mt-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>

          <Form.Group className="mt-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>

          <Button
            onClick={handleLogIn}
            variant="success"
            type="submit"
            className="mt-3"
          >
            Log In
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default LogIn;
