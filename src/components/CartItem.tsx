import React from 'react';
import { IItemCart } from '../context/CartContext';
import styled from 'styled-components';

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

const DeleteButton = styled.button`
  margin-top: 23px;
  border-radius: 3px;
  border: 1px solid rgb(185, 19, 19);
  width: 110px;
  height: 25px;
  background-color: white;
  color: rgb(185, 19, 19);
  margin-bottom: 3px;
  cursor: pointer;
  transition: 0.1s;

  &:hover {
    border: 1px solid red;
    color: red;
  }
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
        <DeleteButton onClick={handleDelete}>Eliminar</DeleteButton>
        <p style={{ fontSize: 13, color: 'rgb(88, 88, 88)', margin: 0 }}>
          Cantidad: {item.amount}
        </p>
      </div>
      <ItemPrice>$ {item.price * item.amount}</ItemPrice>
    </CartItemContainer>
  );
};

export default CartItem;
