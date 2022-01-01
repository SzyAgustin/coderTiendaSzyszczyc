import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";
import "./ItemListContainer.css";
import asyncMock, { IItem } from "../../services/ItemService";

const ItemListContainer = () => {
  const [items, setItems] = useState<IItem[]>([]);

  useEffect(() => {
    asyncMock.then((res) => setItems(res));
  }, []);

  return (
    <div className="container">
      <ItemList items={items} />
    </div>
  );
};

export default ItemListContainer;
