import React, { useContext } from 'react';
import ItemCount from './ItemCount';
import { IItem } from '../../services/ItemService';
import './Item.css';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

interface ItemProps {
  item: IItem;
}

const Item = ({ item }: ItemProps) => {
  const cart = useContext(CartContext);
  const [stock, setStock] = React.useState(item.stock - cart.getAmountInCart!(item.id));
  const navigate = useNavigate();

  const add = (amountToAdd: number) => {
    setStock(stock - amountToAdd);
    const itemToAdd = {
      id: item.id,
      title: item.title,
      amount: amountToAdd
    }
    cart.addItem!(itemToAdd);
  };

  const gotoItemDetails = () => {
    navigate(`/item/${item.id}`);
  };

  return (
    <div onClick={gotoItemDetails} className='item-container'>
      <div className='title-container'>
        <h5 className='title'>{item.title}</h5>
      </div>
      <div className='image-container'>
        <img className='image' src={item.pictureUrl} alt='' />
      </div>
      <div className='item-count-from-item'>
        <ItemCount stock={stock} initial={1} onAdd={add} />
      </div>
    </div>
  );
};

export default Item;
