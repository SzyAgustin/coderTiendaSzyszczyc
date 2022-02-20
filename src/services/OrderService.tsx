import { db } from './Firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { IItemCart } from '../context/CartContext';
import { IUser } from '../context/UserContext';

export const getOrderList = () => {
  return collection(db, 'Orders');
};

const getReadyOrder = (cartItems: IItemCart[], user: IUser) => {
  const cartOrderedItems = cartItems.map((item) => {
    return {
      price: item.price,
      amount: item.amount,
      id: item.id,
      title: item.title,
    };
  });
  return {
    buyer: user,
    items: cartOrderedItems,
    date: Timestamp.fromDate(new Date()),
    total: cartItems.reduce((acc, curr) => curr.amount * curr.price + acc, 0),
  };
};

export const addOrder = (cartItems: IItemCart[], user: IUser) => {
  const orderToAdd = getReadyOrder(cartItems,user);
  const orderList = getOrderList();
  return addDoc(orderList, orderToAdd);
};
