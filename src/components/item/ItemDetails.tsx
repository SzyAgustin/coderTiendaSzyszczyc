import React from 'react'
import ItemCount from './ItemCount'
import './ItemDetails.css';

const ItemDetails = () => {
    const [stock, setStock] = React.useState(10);
    const add = (amountToAdd: number) => {
        setStock(stock - amountToAdd);
        console.log('after this, add to user cart');
    }

    return (
        <div className='item-details-container'>
            <ItemCount stock={stock} initial={1} onAdd={add} />
        </div>
    )
}

export default ItemDetails
