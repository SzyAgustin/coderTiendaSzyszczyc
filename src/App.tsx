import React from "react";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/item/ItemListContainer";
import ItemDetailContainer from "./components/item/ItemDetailContainer";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/cart/Cart";
import { CartProvider } from "./context/CartContext";
import AddItem from "./components/AddItem"; 
import SignIn from './components/SignIn';

function App() {
  return (
    <>
      <CartProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/category/:id" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="cart" element={<Cart />} />
          <Route path="addItem" element={<AddItem />} />
        </Routes>
      </CartProvider>
    </>
  );
}

export default App;
