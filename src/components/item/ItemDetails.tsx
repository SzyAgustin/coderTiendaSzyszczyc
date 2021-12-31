import React from 'react'
import ItemCount from './ItemCount'
import './ItemDetails.css';

const ItemDetails = () => {
    const add = (amountToAdd: number) => {
        console.log('Do something with the amount to Add: ' + amountToAdd);
    }

    return (
        <div className='item-details-container'>
            <ItemCount stock={5} initial={1} onAdd={add} />
        </div>
    )
}

export default ItemDetails
