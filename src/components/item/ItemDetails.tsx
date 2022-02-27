import React, { useContext, useEffect, useState } from 'react';
import { IItem } from '../../services/ItemService';
import ItemCount from './ItemCount';
import { CartContext } from '../../context/CartContext';
import styled from 'styled-components';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../services/Firebase';

interface ItemDetailsProps {
  item: IItem;
}

const DetailsContainer = styled.div`
  max-width: 1200px;
  min-height: 75vh;
  margin: 0 auto;
  display: flex;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0px 10px 0px rgba(0, 0, 0, 0.404);
`;

const Main = styled.div`
  box-sizing: border-box;
  padding: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  min-width: 250px;
`;

const Aside = styled.div`
  box-sizing: border-box;
  padding: 2%;
  min-width: 250px;
  border: 1px solid #bbb;
  border-radius: 10px;
  margin: 15px;
  position: relative;
`;

const Price = styled.h3`
  margin: 0;
  font-size: 40px;
  font-weight: 400;
  letter-spacing: 1px;
`;

const ItemDetails = ({ item }: ItemDetailsProps) => {
  const cart = useContext(CartContext);
  const [stock, setStock] = React.useState(
    item.stock - cart.getAmountInCart!(item.id)
  );
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    getDownloadURL(ref(storage, `images/${item.pictureUrl}`)).then(url => {
      setImageUrl(url)
    })
  }, [])

  const add = (amountToAdd: number) => {
    setStock(stock - amountToAdd);
    cart.dispatch!({ type: 'Add', payload: { ...item, amount: amountToAdd } });
  };

  const imageStyle = {
    backgroundImage: `url(${imageUrl})`,
    width: '70%',
    height: '70%',
    padding: '5%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  };

  return (
    <DetailsContainer>
      <Main>
        <div style={imageStyle}></div>
      </Main>
      <Aside>
        <h2 style={{ fontWeight: 500 }}>{item.title}</h2>
        <Price>$ {item.price}</Price>
        <div style={{ position: 'relative' }}>
          <ItemCount stock={stock} initial={1} onAdd={add}></ItemCount>
        </div>
      </Aside>
    </DetailsContainer>
  );
};

export default ItemDetails;
