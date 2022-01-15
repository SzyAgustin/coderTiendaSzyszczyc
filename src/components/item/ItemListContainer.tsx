import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getItems, IItem } from '../../services/ItemService';
import { getDocs } from 'firebase/firestore';
import styled from 'styled-components';
import Item from './Item';

const ListContainer = styled.div`
  padding-top: 20px;
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

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

  return (
    <ListContainer>
      {loading ? (
        <p>Loading Items...</p>
      ) : (
        items.map((item) => <Item key={item.id} item={item} />)
      )}
    </ListContainer>
  );
};

export default ItemListContainer;
