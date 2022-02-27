import React, { useContext, useEffect, useState } from 'react';
import ItemCount from './ItemCount';
import { IItem } from '../../services/ItemService';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import styled from 'styled-components';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../services/Firebase';

interface ItemProps {
  item: IItem;
}

const ItemContainer = styled.div`
  position: relative;
  height: 300px;
  width: 240px;
  background-color: white;
  border-radius: 5px;
  margin: 20px;
  box-shadow: 0 0px 10px 0px rgba(0, 0, 0, 0.404);
  cursor: pointer;
  transition: 0.1s;

  &:hover {
    box-shadow: 0 0px 20px 0px rgba(0, 0, 0, 0.404);
    transition: 0.2s;
  }
`;

const TitleContainer = styled.div`
  border-bottom: 1px solid rgb(185, 19, 19);
  width: 90%;
  margin: 0 auto;
  height: 10%;
`;

const Title = styled.h5`
  width: 100%;
  text-align: center;
  margin: 10px 0;
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const ImageContainer = styled.div`
  height: 40%;
  width: 80%;
  padding: 0 10%;
  margin-top: 10px;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemCountContainer = styled.div`
  margin-top: 5px;
  box-sizing: border-box;
  padding: 0 5%;
`;

const Item = ({ item }: ItemProps) => {
  const cart = useContext(CartContext);
  const [stock, setStock] = React.useState(
    item.stock - cart.getAmountInCart!(item.id)
  );
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    getDownloadURL(ref(storage, `images/${item.pictureUrl}`)).then(url => {
      setImageUrl(url)
    })
  }, [])

  const add = (amountToAdd: number) => {
    setStock(stock - amountToAdd);
    cart.dispatch!({type:'Add', payload: { ...item, amount: amountToAdd }});
  };

  const gotoItemDetails = () => {
    navigate(`/item/${item.id}`);
  };

  return (
    <ItemContainer onClick={gotoItemDetails}>
      <TitleContainer>
        <Title>{item.title}</Title>
      </TitleContainer>
      <ImageContainer>
        <img style={{ width: 100 }} src={imageUrl} alt='' />
      </ImageContainer>
      <ItemCountContainer>
        <ItemCount stock={stock} initial={1} onAdd={add} />
      </ItemCountContainer>
    </ItemContainer>
  );
};

export default Item;
