import React, { useEffect, useState } from 'react';
import { getItem, IItem } from '../../services/ItemService';
import { useParams } from 'react-router-dom';
import ItemDetails from './ItemDetails';
import { getDoc } from 'firebase/firestore';
import styled from 'styled-components';

const Text = styled.p`
  width: 100%;
  text-align: center;
`;

const ItemDetailContainer = () => {
  const [item, setItem] = useState<IItem | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    getDoc(getItem(id!)).then((doc) => {
      setItem(doc.exists() ? ({ id: doc.id, ...doc.data() } as IItem) : null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <Text>Loading item... </Text>;
  }

  return (
    <>
      {item ? (
        <ItemDetails item={item} />
      ) : (
        <Text>No se encontro el item... </Text>
      )}
    </>
  );
};

export default ItemDetailContainer;
