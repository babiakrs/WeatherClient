import React, { useState, useEffect, useRef } from 'react';

import Map from 'Components/Map';
import Modal from 'Components/Modal';
import Icon from 'Components/Icon';
import ThemeSwitcher from 'Components/ThemeSwitcher';
import { getCookie, setCookie, addClass, replaceClass } from 'Utils';
import 'Styles/variables.css';
import './styles.sass';
import LangSwitcher from 'Components/LangSwitcher';
import { LangContext } from 'Contexts/lang.context';
import { useClickOutside } from 'Hooks/outside-click.hook';

export const THEME_COOKIE_NAME = 'theme';
export const LANG_COOKIE_NAME = 'lang';

export default function App() {
  const [ modalState, setModalState ] = useState(false);
  const [ activeCity, setActiveCity ] = useState(null);
  const [ activeTheme, setActiveTheme ] = useState('light');
  const [ activeLang, setActiveLang ] = useState('uk');

  const modalRef = useRef(null);
  const themeSwitcherRef = useRef(null);
  const langSwitcherRef = useRef(null);
  useClickOutside(modalRef, () => setModalState(false), [themeSwitcherRef, langSwitcherRef]);

  useEffect(() => {
    // Get theme if exists from cookies
    let themeCookie = getCookie(THEME_COOKIE_NAME) || activeTheme;
    setActiveTheme(themeCookie);
    addClass(document.body, themeCookie);

    // Get lang if exists from cookies
    let langCookie = getCookie(LANG_COOKIE_NAME) || activeLang;
    setActiveLang(langCookie);
  }, []);

  const toggleTheme = () => {
    let nextTheme = activeTheme === 'light' ? 'dark' : 'light';
    replaceClass(document.body, activeTheme, nextTheme);
    setActiveTheme(nextTheme);
    setCookie(THEME_COOKIE_NAME, nextTheme, { expires: (new Date(Date.now() + 84600e3 * 30)).toUTCString() });
  };

  const toggleLang = () => {
    const nextLang = activeLang === 'uk' ? 'ru' : activeLang === 'ru' ? 'en' : 'uk';
    setActiveLang(nextLang);
    setCookie(LANG_COOKIE_NAME, nextLang, { expires: (new Date(Date.now() + 84600e3 * 30)).toUTCString() });
  };

  const toggleModal = () => {
    setModalState(!modalState);
  };

  return (
    <LangContext.Provider value={activeLang}>
      <div className='corner-ribbon__wrapper'>
        <a href='https://github.com/Almost-Infinity/WeatherClient' target='_blank' rel='noopener noreferrer' className='corner-ribbon__link'>
          <Icon type='github' className='corner-ribbon__icon'/>
          source
        </a>
      </div>
      <Map toggleModal={toggleModal} modalState={modalState} setActiveCity={setActiveCity}/>
      {modalState && <Modal innerRef={modalRef} toggleModal={toggleModal} activeCity={activeCity.activeCity} style={{zIndex: 100}}/>}
      <LangSwitcher innerRef={langSwitcherRef} activeLang={activeLang} toggleLang={toggleLang} style={{zIndex: 10}}/>
      <ThemeSwitcher innerRef={themeSwitcherRef} activeTheme={activeTheme} toggleTheme={toggleTheme} style={{zIndex: 10}}/>
    </LangContext.Provider>
  );
}
