import React from 'react'
import CartIcon from '../images/cartIcon.png';
import './CartWidget.css';

const CartWidget = () => {
    const [cartCant, setCartCant] = React.useState(0);
    const gotoCart = () => {
        console.log('go to Cart')
    }


    return (
        <div className='cart-container'>
            <img className='cart-icon' src={CartIcon} alt="cart icon" />
            <p className='cart-cant'>{cartCant}</p>
        </div>
    )
}

export default CartWidget
