import React from "react";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/item/ItemListContainer";
import ItemDetailContainer from "./components/item/ItemDetailContainer";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/cart/Cart";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <>
      <CartProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:id" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </>
  );
}

export default App;
