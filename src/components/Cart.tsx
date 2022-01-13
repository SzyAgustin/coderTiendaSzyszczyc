import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { Timestamp, addDoc, writeBatch, Firestore } from 'firebase/firestore';
import ResultMessage from './ResultMessage';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/Firebase';
import { getOrderList } from '../services/OrderService';
import { getItem } from '../services/ItemService';
import styled from 'styled-components';

const CartContainer = styled.div`
  width: 80%;
  background-color: white;
  margin: 10px auto;
  border-radius: 5px;
  box-shadow: 0 0px 5px 0px rgba(0, 0, 0, 0.2);
`;

const PriceBuy = styled.div`
  height: 170px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

interface CartButtonProps {
  buying: boolean
}
const CartButton = styled.button<CartButtonProps>`
  border: none;
  height: 50px;
  width: 260px;
  border-radius: 5px;
  background-color: ${props => props.buying ? 'gray' : 'rgb(185, 19, 19)'};
  color: white;
  cursor: pointer;
  transition: 0.1s;
  font-size: 20px;

  &:hover {
    background-color: ${props => props.buying ? 'gray' : 'red'};
    transition: 0.2s;
  }
`;

const Cart = () => {
  const cart = useContext(CartContext);
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [success, setSuccess] = useState(true);
  const [buying, setBuying] = useState(false);

  const handleDelete = (id: string) => {
    cart.removeItem!(id);
  };

  const getReadyOrder = () => {
    const cartOrderedItems = cart.cartItems.map((item) => {
      return {
        price: item.price,
        amount: item.amount,
        id: item.id,
        title: item.title,
      };
    }); // is there a better way to do this???
    return {
      buyer: {
        name: 'User Name',
        email: 'user.mail@gmail.com',
        phone: 1122334455,
      },
      items: cartOrderedItems,
      date: Timestamp.fromDate(new Date()),
      total: cart.getTotalPrice!(),
    };
  };

  const timeoutRedirect = () => {
    setTimeout(function () {
      navigate('/');
    }, 3000);
  };

  const updateStock = () => {
    cart.cartItems.forEach((item) => {
      writeBatch(db).update(
        getItem(item.id),
        'stock',
        item.stock - item.amount //no esta haciendo el update y no entiendo por que...
      );
    });
    writeBatch(db)
      .commit()
      .then((res) => {
        console.log('succ');
        console.log(res);
      })
      .catch((err) => {
        console.log('err');
        console.log(err);
      });
  };

  const handleOrder = () => {
    setBuying(true);
    const orderToAdd = getReadyOrder();
    const orderList = getOrderList();

    addDoc(orderList, orderToAdd)
      .then((res) => {
        updateStock();
        setSuccess(true);
        setShowMessage(true);
        cart.clear!();
      })
      .catch((err) => {
        setSuccess(false);
        setShowMessage(true);
      })
      .finally(() => {
        timeoutRedirect();
        setBuying(false);
      });
  };

  return (
    <>
      <ResultMessage visible={showMessage} success={success} />
      <CartContainer>
        {cart.cartItems.map((item) => (
          <CartItem item={item} onDelete={handleDelete}></CartItem>
        ))}
        <PriceBuy>
          {cart.cartItems.length === 0 ? (
            <>
              <h1>No hay items en el carrito</h1>
              <Link to='/'>
                <CartButton buying={buying}>
                  Volver al menú principal
                </CartButton>
              </Link>
            </>
          ) : (
            <>
              <h2 style={{ width: 250, textAlign: 'center' }}>
                Precio total: ${cart.getTotalPrice!()}.
              </h2>
              <CartButton buying={buying} onClick={handleOrder} disabled={buying}>
                {buying ? 'Finalizando compra...' : 'Finalizar compra'}
              </CartButton>
            </>
          )}
        </PriceBuy>
      </CartContainer>
    </>
  );
};

export default Cart;
