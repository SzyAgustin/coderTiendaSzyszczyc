import React, { useContext, useEffect } from 'react';
import CartIcon from '../images/cartIcon.png';
import './CartWidget.css';
import { CartContext } from '../context/CartContext';

const CartWidget = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className='cart-widget-container'>
      {cartItems.length !== 0 && (
        <>
          <img className='cart-widget-icon' src={CartIcon} alt='cart icon' />
          <p className='cart-widget-cant'>{cartItems.length}</p>
        </>
      )}
    </div>
  );
};

export default CartWidget;
