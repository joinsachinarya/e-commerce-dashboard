import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="main-nav">
      <Link to="/">Home</Link>
      <Link to="/add">Add Product</Link>
      <Link to="/update">Update Product</Link>
      <Link to="/logout">Logout</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
};

export default Nav;
