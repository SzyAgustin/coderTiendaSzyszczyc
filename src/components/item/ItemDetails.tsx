import { url } from 'inspector';
import React, { useContext } from 'react';
import { IItem } from '../../services/ItemService';
import './ItemDetails.css';
import ItemCount from './ItemCount';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

interface ItemDetailsProps {
  item: IItem;
}

const ItemDetails = ({ item }: ItemDetailsProps) => {
  const cart = useContext(CartContext);
  const [stock, setStock] = React.useState(
    item.stock - cart.getAmountInCart!(item.id)
  );

  const add = (amountToAdd: number) => {
    setStock(stock - amountToAdd);
    const itemToAdd = {
      id: item.id,
      title: item.title,
      amount: amountToAdd
    }
    cart.addItem!(itemToAdd);
  };

  const buyNow = () => {
    console.log('go to buy now');
  };

  const imageStyle = {
    backgroundImage: `url(${item.pictureUrl})`,
    width: '70%',
    height: '70%',
    padding: '5%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  };

  return (
    <div className='container-details'>
      <div className='main'>
        <div style={imageStyle}></div>
      </div>
      <div className='aside'>
        <h2 className='title'>{item.title}</h2>
        <h3 className='price'>$ {item.price}</h3>
        <div className='item-count'>
          <ItemCount stock={stock} initial={1} onAdd={add}></ItemCount>
        </div>
        <NavLink to='/cart'>
          <button className='buy-button'>Comprar ahora</button>
        </NavLink>
      </div>
    </div>
  );
};

export default ItemDetails;
