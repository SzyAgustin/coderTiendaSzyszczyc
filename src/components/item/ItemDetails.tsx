import { url } from "inspector";
import React from "react";
import { IItem } from "../../services/ItemService";
import "./ItemDetails.css";

interface ItemDetailsProps {
  item: IItem;
}

const ItemDetails = ({ item }: ItemDetailsProps) => {
    const imageStyle = {
        backgroundImage: `url(${item.pictureUrl})`,
        width: "70%",
        height: "70%",
        padding: "5%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain"
      };

  return (
    <div className="container">
      <div className="main">
          {/* <img className="image" src={item.pictureUrl} alt="" /> */}
          <div style={imageStyle}></div>
      </div>
      <div className="aside">
          <h2 className="title">{item.title}</h2>
          <h3 className="price">$ {item.price}</h3>
      </div>
    </div>
  );
};

export default ItemDetails;
