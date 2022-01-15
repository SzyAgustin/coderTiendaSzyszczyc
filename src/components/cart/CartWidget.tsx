import React, { useContext } from 'react';
import CartIcon from '../../images/cartIcon.png';
import { CartContext } from '../../context/CartContext';
import styled from 'styled-components';

const WidgetContainer = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 62px;
  `

const CartWidget = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <WidgetContainer>
      {cartItems.length !== 0 && (
        <>
          <img style={{height: 50}} src={CartIcon} alt='cart icon' />
          <p style={{fontWeight: 700,fontSize: 20}}>{cartItems.length}</p>
        </>
      )}
    </WidgetContainer>
  );
};

export default CartWidget;
