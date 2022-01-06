import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";
import "./ItemListContainer.css";
import { useParams } from 'react-router-dom';
import asyncMock, { IItem } from "../../services/ItemService";

const ItemListContainer = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    asyncMock(id).then((res) => {
      setItems(res);
      setLoading(false);
    });
  }, [id]);

  return (
    <div className="container-list">
      {loading ? <p>Loading Items...</p> : <ItemList items={items} />}
    </div>
  );
};

export default ItemListContainer;
