import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Form, Alert } from "react-bootstrap";
import * as Yup from "yup";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    cpassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const collectData = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate({ name, email, password, cpassword });

      let result = await fetch("http://localhost:5000/register", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!result.ok) {
        setError("Registration failed");
      }

      result = await result.json();
      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setError("Validation error");
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <Container className="sign-up-container mt-4 w-25">
      <Card className="p-3">
        <Card.Title className="mb-2">Register</Card.Title>
        <Form className="sign-up-form">
          <Form.Group className="mt-3" controlId="name">
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name"
              onChange={(e) => {
                setName(e.target.value);
                setError(null);
              }}
              value={name}
              required
            />
          </Form.Group>

          <Form.Group className="mt-3" controlId="email">
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              value={email}
              required
            />
          </Form.Group>

          <Form.Group className="mt-3" controlId="password">
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              value={password}
              required
            />
          </Form.Group>

          <Form.Group className="mt-3" controlId="cpassword">
            <Form.Control
              type="password"
              name="cpassword"
              placeholder="Confirm password"
              onChange={(e) => {
                setCpassword(e.target.value);
                setError(null);
              }}
              value={cpassword}
              required
            />
          </Form.Group>
          {error ? (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          ) : null}
          <Button
            onClick={collectData}
            variant="info"
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
