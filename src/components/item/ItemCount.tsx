import React, { EventHandler } from "react";
import "./ItemCount.css";

interface ItemCountProps {
  stock: number;
  initial: number;
  onAdd(amountToAdd: number): any;
}

const ItemCount = ({ stock, initial, onAdd }: ItemCountProps) => {
  const [amountSelected, setAmountSelected] = React.useState(initial);

  const removeFromAmount = () => {
    setAmountSelected(amountSelected - 1);
  };

  const addToAmount = () => {
    setAmountSelected(amountSelected + 1);
  };

  const add = () => {
      onAdd(amountSelected);
  }

  return (
    <>
      <div className="amount-container">
        <button
          className="amount-btns minus"
          onClick={removeFromAmount}
          disabled={amountSelected <= 1}
        >
          -
        </button>
        <p>{amountSelected}</p>
        <button
          className="amount-btns"
          onClick={addToAmount}
          disabled={amountSelected >= stock}
        >
          +
        </button>
      </div>
      <button onClick={add} className="add-to-cart-button">
        Agregar al carrito
      </button>
    </>
  );
};

export default ItemCount;
