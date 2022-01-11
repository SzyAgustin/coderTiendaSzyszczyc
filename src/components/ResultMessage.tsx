import React from 'react';

interface ResultMessageProps {
  visible: boolean;
  success: boolean;
}

const ResultMessage = ({ visible, success }: ResultMessageProps) => {
  const boxStyle = {
    backgroundColor: success ? 'rgb(35, 172, 7)' : 'rgb(237, 31, 31)',
    color: 'white',
    height: 80,
    width: 350,
    position: 'fixed' as 'fixed',
    top: 80,
    left: visible ? 50 : 0,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 3,
    boxShadow: '0 0px 10px 0px rgba(0, 0, 0, 0.600)',
    opacity : visible ? 1: 0,
    transition: '1s'
  };

  const textStyle = {
    margin: 30,
  };

  return (
    <div style={boxStyle}>
      <p style={textStyle}>
        { success ? 'La orden se ha creado con exito. Serás redirigido a la pantalla principal.' : 'Ups... ocurrió un error. Intenta nuevamente.' }
      </p>
    </div>
  );
};

export default ResultMessage;
