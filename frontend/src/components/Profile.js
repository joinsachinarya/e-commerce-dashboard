import React from "react";
import { Card, Container } from "react-bootstrap";

const Profile = () => {
  const details = JSON.parse(localStorage.getItem("user"));
  return (
    <Container className="text-center m-5">
      <Card className="p-4">
        <Card.Title className="">Welcome: {details.name}</Card.Title>
        <Card.Title className="mt-5">Your Email: {details.email}</Card.Title>
      </Card>
    </Container>
  );
};

export default Profile;
