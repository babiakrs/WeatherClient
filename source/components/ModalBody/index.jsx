import React, { useContext, useState } from 'react';
import { array } from 'prop-types';

import { cn } from 'Utils';
import Icon from 'Components/Icon';
import styles from './styles.sass';
import { i18n } from '../../i18n/definition';
import { LangContext } from 'Contexts/lang.context';

function ModalBody({ forecastday }) {
  const activeLang = useContext(LangContext);
  const activeI18n = i18n[activeLang];

  const [ activeDay, setActiveDay ] = useState(0);

  return (
    <React.Fragment>
      <ul className={styles.tabsWrapper}>
      {
        forecastday.map((item, idx) => {
          const date = new Date(item.date_epoch * 1000);
          return (
            <li key={date.getDate()} className={idx === activeDay ? cn(styles.tab, styles.active) : styles.tab} onClick={() => setActiveDay(idx)}>
              <img className={styles.tabIcon} alt={item.day.condition.text} src={item.day.condition.icon} title={item.day.condition.text}/>
              <div className={styles.tabTitle}>{`${activeI18n.month[date.getMonth()]}, ${date.getDate()}`}</div>
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
              <span className={styles.activeDayForecastLabel}>{activeI18n.maxwind}:</span>
              <span className={styles.activeDayForecastValue}>{forecastday[activeDay].day.maxwind_kph} {activeI18n.kmh}</span>
            </li>
            <li className={styles.activeDayForecastItem}>
              <span className={styles.activeDayForecastLabel}>{activeI18n.precip}:</span>
              <span className={styles.activeDayForecastValue}>{forecastday[activeDay].day.totalprecip_mm} {activeI18n.mm}</span>
            </li>
            <li className={styles.activeDayForecastItem}>
              <span className={styles.activeDayForecastLabel}>{activeI18n.humidity}:</span>
              <span className={styles.activeDayForecastValue}>{`${forecastday[activeDay].day.avghumidity} %`}</span>
            </li>
            <li className={styles.activeDayForecastItem}>
              <span className={styles.activeDayForecastLabel}>{activeI18n.sunrise}:</span>
              <span className={styles.activeDayForecastValue}>{forecastday[activeDay].astro.sunrise}</span>
            </li>
            <li className={styles.activeDayForecastItem}>
              <span className={styles.activeDayForecastLabel}>{activeI18n.sunset}:</span>
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
