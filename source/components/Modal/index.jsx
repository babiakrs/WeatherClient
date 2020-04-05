import React from 'react';
import { connect } from 'react-redux';
import { func, array, number } from 'prop-types';

import ModalBody from 'Components/ModalBody';
import styles from './styles.sass';

const LoadingSpinner = (
  <svg className={styles.loadingSpinner} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='64' height='64'>
    <path d='M43.75 221.15h69v69.8h-69zM399.25 221.05h69v69.8h-69zM81.27 381.434l48.79-48.79L179.416 382l-48.79 48.79zM332.577 130l48.79-48.79 49.356 49.356-48.79 48.79zM221.15 399.25h69.8v69h-69.8zM221.05 43.75h69.8v69h-69.8zM332.64 381.936l49.356-49.356 48.79 48.79-49.355 49.356zM81.207 130.63l49.356-49.356 48.79 48.79-49.356 49.356z'/>
  </svg>
);

function Modal({ toggleModal, activeCity, cities }) {
  return (
    <div className={styles.modalBg}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            {cities[activeCity].isFetched && cities[activeCity].weather.location.name}
          </div>
          <div className={styles.modalClose} onClick={toggleModal}>X</div>
        </div>
        <div className={styles.modalBody}>
          {
            cities[activeCity].isFetched ?
              <ModalBody forecastday={cities[activeCity].weather.forecast.forecastday}/> :
              LoadingSpinner
          }
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  toggleModal: func.isRequired,
  activeCity: number.isRequired,
  cities: array.isRequired
};

const mapStateToProps = (state) => ({ cities: state.cities });

export default connect(
  mapStateToProps
)(Modal);