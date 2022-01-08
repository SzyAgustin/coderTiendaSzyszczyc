import React, { createContext, useContext, useState } from 'react';

export const CartContext = createContext({});

export const useCart = () => useContext(CartContext);

interface IItem {
    id: number;
    title: string;
    amount: number;
}

interface CartProviderProps {
    defaultValue?: IItem[],
    children: any
}

export const CartProvider = ({defaultValue = [], children}: CartProviderProps) => {
    const [cartItems, setCartItems] = useState(defaultValue);

    // const addItem = (item: IItem) => {
    //     if (isInCart(item.id)){
    //         const modified = cartItems.map(cartItem => {
    //             if(cartItem.id === item.id) return {...cartItem, amount: cartItem.amount + item.amount}
    //             return cartItem;
    //         })
    //         setCartItems(modified);
    //         return;
    //     } 
    //     cartItems.push(item);
    //     setCartItems(cartItems);
        
    // }

    // const removeItem = (id: number) => {
    //     setCartItems(cartItems.filter(item => item.id != id));
    // }

    const clear = () => {
        setCartItems([]);
    }

    // const isInCart = (id: number) => {
    //     return cartItems.some(item => item.id === id);
    // }

    return (
        <CartContext.Provider value={{cartItems, clear}}>
            {/* <CartContext.Provider value={{cartItems, addItem, removeItem, clear, isInCart}}> */}
            {children}
        </CartContext.Provider>
    )
}