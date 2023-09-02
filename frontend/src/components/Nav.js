import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  function logoClicked() {
    navigate("/");
  }

  return (
    <div className="bg-info">
      {auth ? (
        <ul className="nav-ul">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKenO0TeUMklxuwahgc1jnTJFYCmIh2B5u8Oc3KVnM9lQH-6J7JF6D&usqp=CAE&s"
            alt="logo"
            className="logo"
            onClick={logoClicked}
          />

          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logout} to="/login">
              Logout [{JSON.parse(auth).name}]
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
