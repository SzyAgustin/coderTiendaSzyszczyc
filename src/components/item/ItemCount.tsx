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
  let addToCartDisabled = stock === 0;

  const removeFromAmount = () => {
    setAmountSelected(amountSelected - 1);
  };

  const addToAmount = () => {
    setAmountSelected(amountSelected + 1);
  };

  const add = () => {
    setAmountSelected(1);
    onAdd(amountSelected);
  };

  let minusClass = classNames("amount-btns minus", {
    "btn-disabled": minusDisabled,
  });
  let plusClass = classNames("amount-btns", { "btn-disabled": plusDisabled });
  let addToCartClass = classNames("add-to-cart-button positioned", {
    "add-to-cart-disabled": addToCartDisabled,
  });
  let amountContainerClass = classNames("amount-container positioned", {
    center: stock < 1,
  });

  return (
    <>
      <div className={amountContainerClass}>
        {stock > 0 ? (
          <>
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
          </>
        ) : (
          <p>Sin Stock</p>
        )}
      </div>

      <button
        onClick={add}
        className={addToCartClass}
        disabled={addToCartDisabled}
      >
        Agregar al carrito
      </button>
      <p className="stock positioned">
        Stock: {stock} {stock === 1 ? "unidad" : "unidades"}.
      </p>
    </>
  );
};

export default ItemCount;
