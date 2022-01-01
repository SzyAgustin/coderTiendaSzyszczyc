import React, { EventHandler } from "react";
import "./ItemCount.css";
let classNames = require("classnames");

interface ItemCountProps {
  stock: number;
  initial: number;
  onAdd(amountToAdd: number): any;
}

const ItemCount = ({ stock, initial, onAdd }: ItemCountProps) => {
  const [amountSelected, setAmountSelected] = React.useState(initial);
  let minusDisabled = amountSelected <= 1;
  let plusDisabled = amountSelected >= stock;

  const removeFromAmount = () => {
    setAmountSelected(amountSelected - 1);
  };

  const addToAmount = () => {
    setAmountSelected(amountSelected + 1);
  };

  const add = () => {
    onAdd(amountSelected);
  };

  let minusClass = classNames("amount-btns minus", {
    "btn-disabled": minusDisabled,
  });
  let plusClass = classNames("amount-btns", { "btn-disabled": plusDisabled });

  return (
    <>
      <div className="amount-container positioned">
        <button
          className={minusClass}
          onClick={removeFromAmount}
          disabled={minusDisabled}
        >
          -
        </button>
        <p>{amountSelected}</p>
        <button
          className={plusClass}
          onClick={addToAmount}
          disabled={plusDisabled}
        >
          +
        </button>
      </div>
      <p className="stock positioned">Stock: {stock} {stock === 1 ? 'unidad' : 'unidades'}.</p>
      <button onClick={add} className="add-to-cart-button positioned">
        Agregar al carrito
      </button>
    </>
  );
};

export default ItemCount;
