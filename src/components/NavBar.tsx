import React from "react";
import "./NavBar.css";
import Logo from "../images/logo.png";
import Button from "./Button";
import CartWidget from "./CartWidget";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [loggedIn, setLoggedIn] = React.useState(true);

  const gotoLogin = () => {
    console.log("Go to Login");
  };

  const navItemClass = (navData: any) => navData.isActive ? "navbar-item active" : "navbar-item"

  return (
    <div className="nav-bar">
      <NavLink to="/">
        <img className="logo" src={Logo}></img>
      </NavLink>
      <div>
        <NavLink className={navItemClass} to="/category/vehiculo">
          Vehiculos
        </NavLink>
        <NavLink className={navItemClass} to="/category/electronica">
          Electronica
        </NavLink>
        <NavLink className={navItemClass} to="/category/libro">
          Libros
        </NavLink>
      </div>
      {!loggedIn ? <Button onClick={gotoLogin}></Button> : <NavLink className={() => 'cart'} to="/cart"><CartWidget /></NavLink>}
    </div>
  );
};

export default NavBar;
