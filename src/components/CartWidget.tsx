import React, { useContext, useEffect } from 'react';
import CartIcon from '../images/cartIcon.png';
import './CartWidget.css';
import { CartContext } from '../context/CartContext';

const CartWidget = () => {
  // const [cartCant, setCartCant] = React.useState(0);
  const { cartItems } = useContext(CartContext);

  console.log(cartItems)

  return (
    <div className='cart-container'>
      <img className='cart-icon' src={CartIcon} alt='cart icon' />
      <p className='cart-cant'>{cartItems.length}</p>
    </div>
  );
};

export default CartWidget;
