import React from 'react'
import ItemCount from './ItemCount'
import { IItem } from '../../services/ItemService'
import './Item.css';

interface ItemProps {
    item: IItem;
}

const Item = ({item}: ItemProps) => {
    const [stock, setStock] = React.useState(item.stock);
    const add = (amountToAdd: number) => {
        setStock(stock - amountToAdd);
        console.log('after this, add to user cart');
    }

    return (
        <div className='item-container'>

            
            <ItemCount stock={stock} initial={1} onAdd={add} />
        </div>
    )
}

export default Item
