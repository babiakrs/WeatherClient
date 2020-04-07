import React, { useState, useEffect } from 'react';

import Map from 'Components/Map';
import Modal from 'Components/Modal';
import ThemeSwitcher from 'Components/ThemeSwitcher';
import { getCookie, setCookie, addClass, replaceClass } from 'Utils';
import 'Styles/variables.css';
import './styles.sass';

export default function App() {
  const [ modalState, setModalState ] = useState(false);
  const [ activeCity, setActiveCity ] = useState(null);
  const [ activeTheme, setActiveTheme ] = useState('light');

  useEffect(() => {
    let themeCookie = getCookie('theme') || activeTheme;
    setActiveTheme(themeCookie);
    addClass(document.body, themeCookie);
  }, []);

  const toggleTheme = () => {
    let newTheme = activeTheme === 'light' ? 'dark' : 'light';
    replaceClass(document.body, activeTheme, newTheme);
    setActiveTheme(newTheme);
    setCookie('theme', newTheme, { expires: (new Date(Date.now() + 84600e3 * 30)).toUTCString() });
    console.log('123');
  };

  const toggleModal = () => {
    setModalState(!modalState);
  };

  return (
    <React.Fragment>
      <Map toggleModal={toggleModal} modalState={modalState} setActiveCity={setActiveCity}/>
      {modalState && <Modal toggleModal={toggleModal} activeCity={activeCity.activeCity} style={{zIndex: 100}}/>}
      <ThemeSwitcher activeTheme={activeTheme} toggleTheme={toggleTheme} style={{zIndex: 10}}/>
    </React.Fragment>
  );
}