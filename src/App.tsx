import React from 'react';
import NavBar from './components/NavBar';
import ItemListContainer from './components/item/ItemListContainer';
import ItemDetailContainer from './components/item/ItemDetailContainer';

function App() {
  return (
    <>
      <NavBar />
      {/* <ItemListContainer /> */}

      <ItemDetailContainer />
    </>
  );
}

export default App;
