import React from 'react';
import { func, object, string } from 'prop-types';

import Icon from 'Components/Icon';
import styles from './styles.sass';

function LangSwitcher({ activeLang, toggleLang, style, innerRef }) {
  return (
    <div ref={innerRef} className={styles.langSwitcherContainer} onClick={toggleLang} style={style}>
      <Icon type='lang' width='20' height='20'/>
      <div className={styles.langSwitcherCurrent}>{activeLang?.toUpperCase()}</div>
    </div>
  );
}

LangSwitcher.propTypes = {
  activeLang: string.isRequired,
  toggleLang: func.isRequired,
  style: object,
  innerRef: object.isRequired
};

export default LangSwitcher;
