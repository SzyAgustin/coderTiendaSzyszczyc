import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Cart.css';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

const Cart = () => {
  const cart = useContext(CartContext);

  const handleDelete = (id: number) => {
    cart.removeItem!(id);
  }
  return (
    <>
      <div className='cart-container'>
        {cart.cartItems.map(item => <CartItem item={item} onDelete={handleDelete}></CartItem> )}
        <div className='price-buy'>
          {cart.cartItems.length === 0 ? (
            <>
              <h1>
                No hay items en el carrito
              </h1>
              <Link to="/"><button className='cart-buy-button'>Volver al menú principal</button></Link>
            </>
          ) : (
            <>
              <h2 className='price-text'>
                Precio total: ${cart.getTotalPrice!()}.
              </h2>
              <button className='cart-buy-button'>Finalizar compra</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
