import React, { useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addProduct = async (e) => {
    try {
      e.preventDefault();
      await validation.validate({ name, price, category, company });

      console.log(name, price, category, company);
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      let result = await fetch("http://localhost:5000/add-product", {
        method: "post",
        body: JSON.stringify({ name, price, category, company, userId }),
        headers: { "Content-Type": "application/json" },
      });
      result = await result.json();
      navigate("/");
      console.log(result);
    } catch (error) {
      error instanceof Yup.ValidationError
        ? setError("Please enter valid details")
        : setError("Product could not be added");
    }
  };

  const validation = Yup.object({
    name: Yup.string().required("Name is required"),
    price: Yup.number().required("Price is required"),
    category: Yup.string().required("Category is required"),
    company: Yup.string().required("Company is required"),
  });

  return (
    <Container className="addProduct w-25 mt-5">
      <Card className="p-3">
        <Card.Title>Add Product</Card.Title>
        {error ? (
          <Alert variant="danger">Please enter valid details</Alert>
        ) : null}
        <Form>
          <Form.Group className="" controlId="name">
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={name}
              name="name"
              className="mt-3"
              onChange={(e) => {
                setName(e.target.value);
                setError(null);
              }}
            />
          </Form.Group>
          <Form.Group className="" controlId="price">
            <Form.Control
              name="price"
              type="number"
              className="mt-3"
              placeholder="Enter price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setError(null);
              }}
            />
          </Form.Group>
          <Form.Group className="" controlId="category">
            <Form.Control
              name="category"
              type="text"
              className="mt-3"
              value={category}
              placeholder="Enter category"
              onChange={(e) => {
                setCategory(e.target.value);
                setError(null);
              }}
            />
          </Form.Group>
          <Form.Group className="" controlId="company">
            <Form.Control
              name="company"
              type="text"
              className="mt-3"
              value={company}
              placeholder="Enter company"
              onChange={(e) => {
                setCompany(e.target.value);
                setError(null);
              }}
            />
          </Form.Group>
          <Button type="submit" onClick={addProduct} className=" bg-info mt-4">
            Add Product
          </Button>
        </Form>
      </Card>
    </Container>
  );
};
export default AddProduct;
