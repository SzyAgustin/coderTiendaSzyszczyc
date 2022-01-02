import React, { useEffect, useState } from "react";
import { getItem, IItem } from "../../services/ItemService";
import ItemDetails from "./ItemDetails";
import "./ItemDetailContainer.css";

const ItemDetailContainer = () => {
  const [item, setItem] = useState<IItem | null>(null);

  useEffect(() => {
    getItem.then((res) => setItem(res));
  }, []);

  return (
    <>
      { item ? <ItemDetails item={item} /> : <p className="loading">loading ... </p>}
    </>
  );
};

export default ItemDetailContainer;
