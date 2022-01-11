import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';
import './ItemListContainer.css';
import { useParams } from 'react-router-dom';
import { getItems, IItem } from '../../services/ItemService';
import { getDocs } from 'firebase/firestore';

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
    <div className='container-list'>
      {loading ? <p>Loading Items...</p> : <ItemList items={items} />}
    </div>
  );
};

export default ItemListContainer;
