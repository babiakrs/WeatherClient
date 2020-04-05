import React, { useState } from 'react';
import { array } from 'prop-types';

import { cn } from 'Utils';
import styles from './styles.sass';

const monthsNames = [ 'Январь', 'Февраль', 'Марь', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ];

function ModalBody({ forecastday }) {
  const [ activeDay, setActiveDay ] = useState(0);

  return (
    <React.Fragment>
      <ul className={styles.tabsWrapper}>
      {
        forecastday.map((item, idx) => {
          const date = new Date(item.date_epoch * 1000);
          return (
            <li key={idx} className={idx === activeDay ? cn(styles.tab, styles.active) : styles.tab} onClick={() => setActiveDay(idx)}>
              <img className={styles.tabIcon} alt={item.day.condition.text} src={item.day.condition.icon} title={item.day.condition.text}/>
              <div className={styles.tabTitle}>{`${monthsNames[date.getMonth()]} ${date.getDate()}`}</div>
            </li>
          );
        })
      }
      </ul>
      <div className={styles.activeDayWrapper}>
        <div className={styles.activeDayBoxLeft}>
          <div className={styles.activeDayMaxTemp}>{`${forecastday[activeDay].day.maxtemp_c} °C`}</div>
          <div className={styles.activeDayMinTemp}>{`${forecastday[activeDay].day.mintemp_c} °C`}</div>
        </div>
        <div className={styles.activeDayBoxRight}></div>
      </div>
    </React.Fragment>
  );
}

ModalBody.propTypes = {
  forecastday: array.isRequired
};

export default ModalBody;