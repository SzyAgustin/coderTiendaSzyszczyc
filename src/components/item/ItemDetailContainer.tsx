import React, { useEffect, useState } from 'react';
import { getItem, IItem } from '../../services/ItemService';
import { useParams } from 'react-router-dom';
import ItemDetails from './ItemDetails';
import { getDoc, doc } from 'firebase/firestore';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
  const [item, setItem] = useState<IItem | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    getDoc(getItem(id!)).then((doc) => {
      setItem(doc.exists() ? {id: doc.id, ...doc.data()} as IItem : null)
      setLoading(false);
    });
  }, [id]);

  {
    if (loading) {
      return <p className='loading'>loading... </p>;
    }
  }

  return (
    <>
      {item ? (
        <ItemDetails item={item} />
      ) : (
        <p className='loading'>No se encontro el item... </p>
      )}
    </>
  );
};

export default ItemDetailContainer;
