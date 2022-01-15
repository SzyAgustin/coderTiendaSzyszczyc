import React from 'react';
import { IItemCart } from '../../context/CartContext';
import styled from 'styled-components';
import Button from '../Button';

interface CartItemProps {
  item: IItemCart;
  onDelete: (id: string) => void;
}

const CartItemContainer = styled.div`
  height: 170px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const CartItemTitle = styled.div`
  box-sizing: border-box;
  padding: 50px;
  font-size: 25px;
  font-weight: 500;
  flex-basis: 50%;
`;

const ItemPrice = styled.div`
  font-size: 30px;
  font-weight: 700;
  flex-basis: 25%;
`;

const CartItem = ({ item, onDelete }: CartItemProps) => {
  const handleDelete = () => {
    onDelete(item.id);
  };

  return (
    <CartItemContainer>
      <CartItemTitle>{item.title}</CartItemTitle>
      <div style={{ margin: '0 auto', flexBasis: '25%' }}>
        <Button width='110px' heigth='25px' fontSize={13} marginTop={20} onClick={handleDelete}>Eliminar</Button>
        <p style={{ fontSize: 13, color: 'rgb(88, 88, 88)', margin: 0 }}>
          Cantidad: {item.amount}
        </p>
      </div>
      <ItemPrice>$ {item.price * item.amount}</ItemPrice>
    </CartItemContainer>
  );
};

export default CartItem;
