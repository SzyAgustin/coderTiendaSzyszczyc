import { db } from './Firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { IItemCart } from '../context/CartContext';

export const getOrderList = () => {
  return collection(db, 'Orders');
};

const getReadyOrder = (cartItems: IItemCart[]) => {
  const cartOrderedItems = cartItems.map((item) => {
    return {
      price: item.price,
      amount: item.amount,
      id: item.id,
      title: item.title,
    };
  });
  return {
    buyer: {
      name: 'User Name',
      email: 'user.mail@gmail.com',
      phone: 1122334455,
    },
    items: cartOrderedItems,
    date: Timestamp.fromDate(new Date()),
    total: cartItems.reduce((acc, curr) => curr.amount * curr.price + acc, 0),
  };
};

export const addOrder = (cartItems: IItemCart[]) => {
  const orderToAdd = getReadyOrder(cartItems);
  const orderList = getOrderList();
  return addDoc(orderList, orderToAdd);
};
