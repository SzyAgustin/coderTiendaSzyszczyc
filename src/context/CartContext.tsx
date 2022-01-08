import React, { createContext, useContext, useState } from "react";

interface IItem {
  id: number;
  title: string;
  amount: number;
}

interface CartProviderProps {
  defaultValue?: IItem[];
  children: any;
}

interface ICartContext {
    cartItems: IItem[],
    addItem?: (item: IItem) => void,
    removeItem?: (id: number) => void,
    clear?: () => void,
    isInCart?: (id: number) => void,
    getAmountInCart?: (id: number) => number
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

  const addItem = (item: IItem) => {
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

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id != id));
  };

  const clear = () => {
    setCartItems([]);
  };

  const isInCart = (id: number) => {
    return cartItems.some((item) => item.id === id);
  };

  const getAmountInCart = (itemId: number) => {
    const item = cartItems.find(item => item.id === itemId);
    return item ? item.amount : 0;
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addItem, removeItem, clear, isInCart, getAmountInCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
