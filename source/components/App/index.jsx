import React, { useState } from 'react';

import Map from 'Components/Map';
import Modal from 'Components/Modal';

export default function App() {
  const [ modalState, setModalState ] = useState(false);
  const [ activeCity, setActiveCity ] = useState(null);

  const toggleModal = () => {
    setModalState(!modalState);
  };

  return (
    <React.Fragment>
      <Map toggleModal={toggleModal} modalState={modalState} setActiveCity={setActiveCity}/>
      {modalState && <Modal toggleModal={toggleModal} activeCity={activeCity.activeCity}/>}
    </React.Fragment>
  );
}