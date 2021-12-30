import React from "react";
import "./NavBar.css";
import Logo from "../images/logo.png";
import Button from "./Button";
import NavBarItem from "./NavBarItem";
import CartWidget from "./CartWidget";

const NavBar = () => {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const gotoInicio = () => {
    console.log("Go to Inicio");
  };

  const gotoVehiculos = () => {
    console.log("Go to Vehiculos");
  };

  const gotoElectronica = () => {
    console.log("Go to Electronica");
  };

  const gotoLibros = () => {
    console.log("Go to Libros");
  };

  const gotoLogin = () => {
    console.log("Go to Login");
  };

  return (
    <div className="nav-bar">
      <img className="logo" onClick={gotoInicio} src={Logo}></img>
      <div>
        <NavBarItem onClick={gotoVehiculos}>Vehiculos</NavBarItem>
        <NavBarItem onClick={gotoElectronica}>Electronica</NavBarItem>
        <NavBarItem onClick={gotoLibros}>Libros</NavBarItem>
      </div>
      {!loggedIn ? <Button onClick={gotoLogin}></Button> : <CartWidget />}
    </div>
  );
};

export default NavBar;
