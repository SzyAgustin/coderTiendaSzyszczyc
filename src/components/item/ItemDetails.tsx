import { url } from "inspector";
import React from "react";
import { IItem } from "../../services/ItemService";
import "./ItemDetails.css";
import ItemCount from "./ItemCount";

interface ItemDetailsProps {
  item: IItem;
}

const ItemDetails = ({ item }: ItemDetailsProps) => {
  const add = () => {
    console.log("send to cart");
  };
  const imageStyle = {
    backgroundImage: `url(${item.pictureUrl})`,
    width: "70%",
    height: "70%",
    padding: "5%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  };

  return (
    <div className="container">
      <div className="main">
        <div style={imageStyle}></div>
      </div>
      <div className="aside">
        <h2 className="title">{item.title}</h2>
        <h3 className="price">$ {item.price}</h3>
        <div className="item-count-container">
          <ItemCount stock={item.stock} initial={1} onAdd={add}></ItemCount>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
