import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Button';

interface ItemCountProps {
  stock: number;
  initial: number;
  onAdd(amountToAdd: number): any;
}

const ItemCountContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Stock = styled.p`
  padding: 0;
  width: 100%;
  color: gray;
  font-size: 13px;
  margin: 0;
`;

interface AmountContainerProps {
  stock: number;
}

const AmountContainer = styled.div<AmountContainerProps>`
  display: flex;
  justify-content: space-between;
  border: 2px solid #bbb;
  width: 100%;
  height: 40px;
  align-items: center;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 5px 0;
  ${(p) => (p.stock < 1 ? 'justify-content: center;' : '')}
`;

const AmountButton = styled.button`
  background: none;
  border: none;
  font-size: 30px;
  color: ${(p) => (p.disabled ? 'gray' : 'rgb(185, 19, 19)')};
  cursor: pointer;
  transition: 0.1s;
  user-select: none;

  &:hover {
    color: ${(p) => (p.disabled ? 'gray' : 'red')};
    transition: 0.4s;
  }
`;

const AmountButtonMinus = styled(AmountButton)`
  margin-bottom: 2px;
`;

const AddToCartButton = styled.button`
  width: 100%;
  height: 40px;
  border: 2px solid ${(p) => (p.disabled ? 'gray' : 'rgb(185, 19, 19)')};
  background-color: #fff;
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  border-radius: 5px;
  color: ${(p) => (p.disabled ? 'gray' : 'rgb(185, 19, 19)')};
  transition: 0.2s;
  margin: 5px 0;
  user-select: none;

  &:hover {
    color: ${(p) => (p.disabled ? 'gray' : 'red')};
    border-color: ${(p) => (p.disabled ? 'gray' : 'red')};
    transition: 0.4s;
  }
`;

const ItemCount = ({ stock, initial, onAdd }: ItemCountProps) => {
  const [amountSelected, setAmountSelected] = React.useState(initial);
  let minusDisabled = amountSelected <= 1;
  let plusDisabled = amountSelected >= stock;
  let addToCartDisabled = stock === 0;
  const navigate = useNavigate();

  useEffect(() => {
    if (stock === 0){
      setAmountSelected(0);
    }
  }, [stock]);

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

  const buyNow = () => {
    onAdd(amountSelected);
    setAmountSelected(1);
    navigate(`/cart`);
  };

  return (
    <ItemCountContainer>
      <AmountContainer
        onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
        stock={stock}
      >
        {stock > 0 ? (
          <>
            <AmountButtonMinus
              onClick={removeFromAmount}
              disabled={minusDisabled}
            >
              -
            </AmountButtonMinus>
            <p>{amountSelected}</p>
            <AmountButton onClick={addToAmount} disabled={plusDisabled}>
              +
            </AmountButton>
          </>
        ) : (
          <p>Sin Stock</p>
        )}
      </AmountContainer>

      <Button onClick={add} disabled={addToCartDisabled} marginTop={8}>
        Agregar al carrito
      </Button>
      <Stock>
        Stock: {stock} {stock === 1 ? 'unidad' : 'unidades'}.
      </Stock>
      {useLocation().pathname.includes('item') && (
        <Button primary={true} onClick={buyNow} marginTop={10}>
          Comprar ahora
        </Button>
      )}
    </ItemCountContainer>
  );
};

export default ItemCount;
