import React from 'react';
import NavBar from './components/NavBar';
import ItemListContainer from './components/item/ItemListContainer';
import ItemDetailContainer from './components/item/ItemDetailContainer';
import { Routes, Route } from 'react-router-dom';
import Cart from './components/cart/Cart';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import AddItem from './components/AddItem';
import SignIn from './components/SignIn';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <CartProvider>
        <UserProvider>
          <NavBar />
          <Routes>
            <Route
              path='/'
              element={
                <PrivateRoute>
                  <ItemListContainer />
                </PrivateRoute>
              }
            />
            <Route path='/signIn' element={<SignIn />} />
            <Route
              path='/category/:id'
              element={
                <PrivateRoute>
                  <ItemListContainer />
                </PrivateRoute>
              }
            />
            <Route
              path='/item/:id'
              element={
                <PrivateRoute>
                  <ItemDetailContainer />
                </PrivateRoute>
              }
            />
            <Route
              path='cart'
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path='addItem'
              element={
                <PrivateRoute>
                  <AddItem />
                </PrivateRoute>
              }
            />
          </Routes>
        </UserProvider>
      </CartProvider>
    </>
  );
}

export default App;
