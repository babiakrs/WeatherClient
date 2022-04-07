import React from 'react';
import { string, func, object } from 'prop-types';

import Icon from 'Components/Icon';
import styles from './styles.sass';

function ThemeSwitcher({ activeTheme, toggleTheme, style, innerRef }) {
  const iconType = activeTheme === 'light' ? 'sun' : 'moon';

  return (
    <div ref={innerRef} className={styles.themeSwitcherContainer} onClick={toggleTheme} style={style}>
      <Icon type={iconType} width='25' height='25'/>
    </div>
  );
}

ThemeSwitcher.propTypes = {
  activeTheme: string.isRequired,
  toggleTheme: func.isRequired,
  style: object,
  innerRef: object.isRequired
};

export default ThemeSwitcher;
