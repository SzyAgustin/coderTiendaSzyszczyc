import React, { useContext } from "react";
import { CartProvider, useCart } from "../context/CartContext";

const Cart = () => {
    const cart = useCart();
    console.log(cart);
  return (
    <CartProvider>
      <div>blabla</div>
    </CartProvider>
  );
};

export default Cart;
