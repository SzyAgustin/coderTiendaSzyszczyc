import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';
import { useParams } from 'react-router-dom';
import { getItems, IItem } from '../../services/ItemService';
import { getDocs } from 'firebase/firestore';
import styled from 'styled-components';

const ItemListContainer = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const query = getItems(id);
    getDocs(query).then((querySnapshot) => {
      setItems(
        querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() } as IItem;
        })
      );
      setLoading(false);
    });
  }, [id]);

  const ListContainer = styled.div`
    padding-top: 20px;
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  `;

  return (
    <ListContainer>
      {loading ? <p>Loading Items...</p> : <ItemList items={items} />}
    </ListContainer>
  );
};

export default ItemListContainer;
