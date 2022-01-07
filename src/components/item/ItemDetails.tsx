import { url } from "inspector";
import React from "react";
import { IItem } from "../../services/ItemService";
import "./ItemDetails.css";
import ItemCount from "./ItemCount";
import { NavLink } from "react-router-dom";

interface ItemDetailsProps {
  item: IItem;
}

const ItemDetails = ({ item }: ItemDetailsProps) => {
  const [stock, setStock] = React.useState(item.stock);

  const add = (amount: number) => {
    setStock(stock - amount);
  };

  const buyNow = () => {
    console.log("go to buy now");
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
    <div className="container-details">
      <div className="main">
        <div style={imageStyle}></div>
      </div>
      <div className="aside">
        <h2 className="title">{item.title}</h2>
        <h3 className="price">$ {item.price}</h3>
        <div className="item-count">
          <ItemCount stock={stock} initial={1} onAdd={add}></ItemCount>
        </div>
        <NavLink to="/cart">
          <button className="buy-button">Comprar ahora</button>
        </NavLink>
      </div>
    </div>
  );
};

export default ItemDetails;
