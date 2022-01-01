import React from 'react'
import Item from './Item'
import { IItem } from '../../services/ItemService'

interface ItemListProps {
    items: IItem[]
}

const ItemList = ({items}: ItemListProps) => {
    return (
        <>
            {items.map(item => <Item item={item}/>)}
        </>
    )
}

export default ItemList