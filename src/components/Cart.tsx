import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const cart = useContext(CartContext);
  return <div>{cart.cartItems.length}</div>;
};

export default Cart;
