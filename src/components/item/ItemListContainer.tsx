import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";
import "./ItemListContainer.css";
import asyncMock, { IItem } from "../../services/ItemService";

const ItemListContainer = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    asyncMock.then((res) => {
      setItems(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container">
      {loading ? <p>Loading Items...</p> : <ItemList items={items} />}
    </div>
  );
};

export default ItemListContainer;
