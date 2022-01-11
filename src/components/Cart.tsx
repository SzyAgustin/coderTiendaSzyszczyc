import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import './Cart.css';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { Timestamp, addDoc, writeBatch, Firestore } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import ResultMessage from './ResultMessage';
import { useNavigate } from 'react-router-dom';
import { db, getFirebase } from '../services/Firebase';
import { getOrderList } from '../services/OrderService';
import { getItem } from '../services/ItemService';

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
      <div className='cart-container'>
        {cart.cartItems.map((item) => (
          <CartItem item={item} onDelete={handleDelete}></CartItem>
        ))}
        <div className='price-buy'>
          {cart.cartItems.length === 0 ? (
            <>
              <h1>No hay items en el carrito</h1>
              <Link to='/'>
                <button className='cart-buy-button'>
                  Volver al menú principal
                </button>
              </Link>
            </>
          ) : (
            <>
              <h2 className='price-text'>
                Precio total: ${cart.getTotalPrice!()}.
              </h2>
              <button
                onClick={handleOrder}
                disabled={buying}
                className={`cart-buy-button ${
                  buying ? 'cart-buy-button-disabled' : ''
                }`}
              >
                {buying ? 'Finalizando compra...' : 'Finalizar compra'}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
