import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { Timestamp, addDoc, writeBatch, Firestore } from 'firebase/firestore';
import ResultMessage from './ResultMessage';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/Firebase';
import { addOrder, getOrderList } from '../services/OrderService';
import { getItem, updateStock } from '../services/ItemService';
import styled from 'styled-components';
import Button from './Button';

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

const Cart = () => {
  const cart = useContext(CartContext);
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [success, setSuccess] = useState(true);
  const [buying, setBuying] = useState(false);
  const batch = writeBatch(db);

  const handleDelete = (id: string) => {
    cart.dispatch!({ type: 'Remove', payload: id });
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

  const handleOrder = () => {
    setBuying(true);
    addOrder(cart.cartItems)
      .then(async (res) => {
        await updateStock(cart.cartItems);
        setSuccess(true);
        setShowMessage(true);
        cart.dispatch!({ type: 'Clear' });
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
                <Button
                  fontSize={20}
                  primary={true}
                  width='260px'
                  heigth='50px'
                >
                  Volver al menú principal
                </Button>
              </Link>
            </>
          ) : (
            <>
              <h2 style={{ width: 250, textAlign: 'center' }}>
                Precio total: ${cart.getTotalPrice!()}.
              </h2>
              <Button
                fontSize={20}
                primary={true}
                width='260px'
                heigth='50px'
                onClick={handleOrder}
                disabled={buying}
              >
                {buying ? 'Finalizando compra...' : 'Finalizar compra'}
              </Button>
            </>
          )}
        </PriceBuy>
      </CartContainer>
    </>
  );
};

export default Cart;
