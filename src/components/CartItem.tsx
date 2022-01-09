import React from 'react'
import './CartItem.css';
import { IItemCart } from '../context/CartContext';

interface CartItemProps {
    item: IItemCart,
    onDelete: (id: number) => void
}

const CartItem = ({item, onDelete}: CartItemProps) => {
    const handleDelete = () => {
        onDelete(item.id);
    }

    return (
        <div className='cart-item'>
            <div className='cart-item-title'>{item.title}</div>
            <div className='cart-item-delete-container'>
                <button onClick={handleDelete} className='cart-item-delete-button'>Eliminar</button>
                <p className='amount-note'>Cantidad: {item.amount}</p>
            </div>
            <div className='cart-item-price'>$ {item.price * item.amount}</div>
        </div>
    )
}

export default CartItem
