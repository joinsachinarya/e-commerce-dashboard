import React, { useState, useEffect } from "react";
import { Button, Card, Container, Form, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      authorization: JSON.parse(localStorage.getItem("token")),
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <Form.Control
        type="text"
        placeholder="Search product"
        className="search"
        onChange={searchHandle}
      />
      <Card.Title className="mt-4">All Products 👇</Card.Title>
      <div className="row products">
        {products.length > 0 ? (
          products.map((product, index) => {
            return (
              <Card
                key={index}
                className="product-card w-25 m-4 display-inline"
              >
                <Image
                  src={product.image}
                  style={{
                    height: "10rem",
                    marginTop: "1rem",
                    borderRadius: "8px",
                  }}
                />
                <Container className=" p-4">
                  <div>Name: {product.name}</div>
                  <div>Price: ${product.price}</div>
                  <div>
                    <span>Category: {product.category} | </span>
                    <span>Company: {product.company}</span>
                  </div>
                </Container>
                <Container className="m-3">
                  <Button
                    onClick={() => deleteProduct(product._id)}
                    variant="danger"
                    style={{ marginRight: "3rem" }}
                  >
                    Delete
                  </Button>
                  <Link to={"update/" + product._id}>
                    <Button>Update</Button>
                  </Link>
                </Container>
              </Card>
            );
          })
        ) : (
          <Card.Title className="mt-5">
            No products, please add some products!
          </Card.Title>
        )}
      </div>
    </div>
  );
};

export default ProductList;
