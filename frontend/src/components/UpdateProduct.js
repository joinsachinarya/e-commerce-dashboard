import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [image, setImage] = useState("");
  const params = useParams();
  const navigete = useNavigate();

  useEffect(() => {
    getProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProductDetails = async () => {
    console.log(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
    setImage(result.image);
  };

  const updateProduct = async () => {
    console.log(name, price, category, company, image);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company, image }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    navigete("/");
  };

  return (
    <Container className="update-product text-center ">
      <Card className="addProduct w-25 p-4">
        <Form.Control
          type="text"
          placeholder="Enter product name"
          className="mt-2"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Form.Control
          type="text"
          placeholder="Enter product price"
          className="mt-2"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <Form.Control
          type="text"
          placeholder="Update image link"
          className="mt-2"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
        <Form.Control
          type="text"
          placeholder="Enter product category"
          className="mt-2"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        <Form.Control
          type="text"
          placeholder="Enter product company"
          className="mt-2"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
          }}
        />
        <Button
          onClick={updateProduct}
          variant="info"
          className="addProductBtn mt-3"
        >
          Update Product
        </Button>
      </Card>
    </Container>
  );
};
export default UpdateProduct;
