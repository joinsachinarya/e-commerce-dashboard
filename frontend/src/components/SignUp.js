import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  function handleSignUp(e) {
    e.preventDefault();
    console.log(name, email, password, cpassword);
  }

  return (
    <Container className="sign-up-container mt-4 w-25">
      <Card className="p-3">
        <Card.Title className="mb-2">Register</Card.Title>
        <Form className="sign-up-form">
          <Form.Group className="mt-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Group>

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

          <Form.Group className="mt-3" controlId="cpassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              name="cpassword"
              placeholder="Enter password"
              onChange={(e) => setCPassword(e.target.value)}
              value={cpassword}
            />
          </Form.Group>

          <Button
            onClick={handleSignUp}
            variant="success"
            type="submit"
            className="mt-3"
          >
            Sign Up
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default SignUp;
