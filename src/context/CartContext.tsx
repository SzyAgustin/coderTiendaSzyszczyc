import React, { createContext, useContext, useState } from "react";
import { NumericLiteral } from "typescript";
import { IItem } from '../services/ItemService';

export interface IItemCart extends IItem {
  amount: number
}

interface CartProviderProps {
  defaultValue?: IItemCart[];
  children: any;
}

interface ICartContext {
    cartItems: IItemCart[],
    addItem?: (item: IItemCart) => void,
    removeItem?: (id: string) => void,
    clear?: () => void,
    isInCart?: (id: string) => void,
    getAmountInCart?: (id: string) => number,
    getTotalPrice?: () => number
}

const defaultState = {
    cartItems: []
}

export const CartContext = createContext<ICartContext>(defaultState);

export const CartProvider = ({
  defaultValue = [],
  children,
}: CartProviderProps) => {
  const [cartItems, setCartItems] = useState(defaultValue);

  const addItem = (item: IItemCart) => {
    if (isInCart(item.id)) {
      const modified = cartItems.map((cartItem) => {
        if (cartItem.id === item.id)
          return { ...cartItem, amount: cartItem.amount + item.amount };
        return cartItem;
      });
      setCartItems(modified);
      return;
    }
    setCartItems([...cartItems, item]);
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id != id));
  };

  const clear = () => {
    setCartItems([]);
  };

  const isInCart = (id: string) => {
    return cartItems.some((item) => item.id === id);
  };

  const getAmountInCart = (itemId: string) => {
    const item = cartItems.find(item => item.id === itemId);
    return item ? item.amount : 0;
  }

  const getTotalPrice = () => {
    return cartItems.map(item => item.amount * item.price).reduce((prev, cur) => prev + cur);
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addItem, removeItem, clear, isInCart, getAmountInCart, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
