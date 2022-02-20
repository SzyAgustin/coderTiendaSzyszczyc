import React, { createContext, useReducer } from 'react';
import { IItem } from '../services/ItemService';

const addItem = (currentCartItems: IItemCart[], itemToAdd: IItemCart) => {
  if (currentCartItems.some((item) => item.id === itemToAdd.id)) {
    return currentCartItems.map((cartItem) => {
      if (cartItem.id === itemToAdd.id)
        return { ...cartItem, amount: cartItem.amount + itemToAdd.amount };
      return cartItem;
    });
  }
  return [...currentCartItems, itemToAdd];
};

const removeItem = (currentCartItems: IItemCart[], id: string) => {
  return currentCartItems.filter((item) => item.id != id);
};

const initialState: ICartState = {
  cartItems: [],
};

interface IAction {
  type: string;
  payload: any;
}

const reducer = (state: ICartState, action: IAction) => {
  switch (action.type) {
    case 'Add':
      return { ...state, cartItems: addItem(state.cartItems, action.payload) };
    case 'Remove':
      return {
        ...state,
        cartItems: removeItem(state.cartItems, action.payload),
      };
    case 'Clear':
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};

export interface IItemCart extends IItem {
  amount: number;
}

interface CartProviderProps {
  children: any;
}

interface ICartState {
  cartItems: IItemCart[];
  getAmountInCart?: (id: string) => number;
  getTotalPrice?: () => number;
  dispatch?: any;
}

export const CartContext = createContext<ICartState>(initialState);

export const CartProvider = ({
  children,
}: CartProviderProps) => {
  const [cartState, dispatch] = useReducer(reducer, initialState);

  const getAmountInCart = (itemId: string) => {
    const item = cartState.cartItems.find((item) => item.id === itemId);
    return item ? item.amount : 0;
  };

  const getTotalPrice = () => {
    return cartState.cartItems
      .map((item) => item.amount * item.price)
      .reduce((prev, cur) => prev + cur);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cartState.cartItems,
        getAmountInCart,
        getTotalPrice,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
