import React from 'react';
import './ItemCount.css';
import { useLocation, useNavigate } from 'react-router-dom';
let classNames = require('classnames');

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
  const navigate = useNavigate();

  console.log(useLocation().pathname);

  const removeFromAmount = (e: React.MouseEvent<HTMLElement>) => {
    if (e.stopPropagation) e.stopPropagation();
    setAmountSelected(amountSelected - 1);
  };

  const addToAmount = (e: React.MouseEvent<HTMLElement>) => {
    if (e.stopPropagation) e.stopPropagation();
    setAmountSelected(amountSelected + 1);
  };

  const add = (e: React.MouseEvent<HTMLElement>) => {
    if (e.stopPropagation) e.stopPropagation();
    onAdd(amountSelected);
    setAmountSelected(1);
  };

  let minusClass = classNames('amount-btns minus', {
    'btn-disabled': minusDisabled,
  });
  let plusClass = classNames('amount-btns', { 'btn-disabled': plusDisabled });
  let addToCartClass = classNames('add-to-cart-button', {
    'add-to-cart-disabled': addToCartDisabled,
  });
  let amountContainerClass = classNames('amount-container', {
    center: stock < 1,
  });

  const buyNow = () => {
    onAdd(amountSelected);
    setAmountSelected(1);
    navigate(`/cart`);
  };

  return (
    <div className='item-count-container'>
      <div
        onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
        className={amountContainerClass}
      >
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
      <p className='stock'>
        Stock: {stock} {stock === 1 ? 'unidad' : 'unidades'}.
      </p>
      {useLocation().pathname.includes('item') && (
        <button onClick={buyNow} className='buy-button'>
          Comprar ahora
        </button>
      )}
    </div>
  );
};

export default ItemCount;
