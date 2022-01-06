import React, { useEffect, useState } from "react";
import { getItem, IItem } from "../../services/ItemService";
import { useParams } from 'react-router-dom';
import ItemDetails from "./ItemDetails";
import "./ItemDetailContainer.css";

const ItemDetailContainer = () => {
  const [item, setItem] = useState<IItem | null>(null);
  const { id } = useParams();

  useEffect(() => {
    getItem(id!).then((res) => setItem(res));
  }, [id]);

  return (
    <>
      { item ? <ItemDetails item={item} /> : <p className="loading">loading ... </p>}
    </>
  );
};

export default ItemDetailContainer;
