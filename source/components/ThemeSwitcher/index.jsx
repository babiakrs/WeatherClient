import React from 'react';
import { string, func, object } from 'prop-types';

import Icon from 'Components/Icon';
import styles from './styles.sass';

function ThemeSwitcher({ activeTheme, toggleTheme, style }) {
  const iconType = activeTheme === 'light' ? 'sun' : 'moon';

  return (
    <div className={styles.themeSwitcherContainer} onClick={toggleTheme} style={style}>
      <Icon type={iconType} width='25' height='25'/>
    </div>
  );
}

ThemeSwitcher.propTypes = {
  activeTheme: string.isRequired,
  toggleTheme: func.isRequired,
  style: object
};

export default ThemeSwitcher;