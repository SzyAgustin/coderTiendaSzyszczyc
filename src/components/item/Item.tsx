import React from "react";
import ItemCount from "./ItemCount";
import { IItem } from "../../services/ItemService";
import "./Item.css";
import { useNavigate } from 'react-router-dom';

interface ItemProps {
  item: IItem;
}

const Item = ({ item }: ItemProps) => {
  const [stock, setStock] = React.useState(item.stock);
  const navigate = useNavigate();
  
  const add = (amountToAdd: number) => {
    setStock(stock - amountToAdd);
    console.log("after this, add to user cart");
  };

  const gotoItemDetails = () => {
    navigate(`/item/${item.id}`);
  }

  return (
    <div onClick={gotoItemDetails} className="item-container">
      <div className="title-container">
        <h5 className="title">{item.title}</h5>
      </div>
      <div className="image-container">
        <img className="image" src={item.pictureUrl} alt="" />
      </div>
      <div className="item-count-from-item">
        <ItemCount stock={stock} initial={1} onAdd={add} />
      </div>
    </div>
  );
};

export default Item;
