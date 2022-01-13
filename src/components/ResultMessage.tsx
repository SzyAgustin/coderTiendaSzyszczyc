import React from 'react';
import styled from 'styled-components';

interface ResultMessageProps {
  visible: boolean;
  success: boolean;
}

interface ResultBoxProps {
  success: boolean;
  visible: boolean;
}

const ResultBox = styled.div<ResultBoxProps>`
  background-color: ${(p) =>
    p.success ? 'rgb(35, 172, 7)' : 'rgb(237, 31, 31)'};
  color: white;
  height: 80px;
  width: 350px;
  position: fixed;
  top: 80px;
  left: ${(p) => (p.visible ? '50px' : '0px')};
  display: flex;
  align-items: center;
  border-radius: 3px;
  box-shadow: 0 0px 10px 0px rgba(0, 0, 0, 0.6);
  opacity: ${(p) => (p.visible ? 1 : 0)};
  transition: 1s;
`;
const ResultMessage = ({ visible, success }: ResultMessageProps) => {
  return (
    <ResultBox visible={visible} success={success}>
      <p style={{ margin: 30 }}>
        {success
          ? 'La orden se ha creado con exito. Serás redirigido a la pantalla principal.'
          : 'Ups... ocurrió un error. Intenta nuevamente.'}
      </p>
    </ResultBox>
  );
};

export default ResultMessage;
