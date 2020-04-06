import React, { useState } from 'react';
import { array } from 'prop-types';

import { cn } from 'Utils';
import Icon from 'Components/Icon';
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
              <div className={styles.tabTitle}>{`${monthsNames[date.getMonth()]}, ${date.getDate()}`}</div>
            </li>
          );
        })
      }
      </ul>
      <div className={styles.activeDayWrapper}>
        <div className={styles.activeDayBoxLeft}>
          <div className={styles.activeDayMaxTemp}>
            <Icon className={styles.activeDayIcon} type='sun' width='25' height='25'/>
            {`${forecastday[activeDay].day.maxtemp_c} °C`}
          </div>
          <div className={styles.activeDayMinTemp}>
            <Icon className={styles.activeDayIcon} type='moon' width='25' height='25'/>
            {`${forecastday[activeDay].day.mintemp_c} °C`}
          </div>
        </div>
        <div className={styles.activeDayBoxRight}>
          <ul className={styles.activeDayForecastList}>
            <li className={styles.activeDayForecastItem}>
              <span className={styles.activeDayForecastLabel}>Скорость ветра:</span>
              <span className={styles.activeDayForecastValue}>{`${forecastday[activeDay].day.maxwind_kph} км/ч`}</span>
            </li>
            <li className={styles.activeDayForecastItem}>
              <span className={styles.activeDayForecastLabel}>Осадки:</span>
              <span className={styles.activeDayForecastValue}>{`${forecastday[activeDay].day.totalprecip_mm} мм`}</span>
            </li>
            <li className={styles.activeDayForecastItem}>
              <span className={styles.activeDayForecastLabel}>Влажность:</span>
              <span className={styles.activeDayForecastValue}>{`${forecastday[activeDay].day.avghumidity} %`}</span>
            </li>
            <li className={styles.activeDayForecastItem}>
              <span className={styles.activeDayForecastLabel}>Рассвет:</span>
              <span className={styles.activeDayForecastValue}>{forecastday[activeDay].astro.sunrise}</span>
            </li>
            <li className={styles.activeDayForecastItem}>
              <span className={styles.activeDayForecastLabel}>Закат:</span>
              <span className={styles.activeDayForecastValue}>{forecastday[activeDay].astro.sunset}</span>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

ModalBody.propTypes = {
  forecastday: array.isRequired
};

export default ModalBody;