import React from 'react';
import { connect } from 'react-redux';
import { func, array, number, object } from 'prop-types';

import Icon from 'Components/Icon';
import ModalBody from 'Components/ModalBody';
import styles from './styles.sass';

function Modal({ toggleModal, activeCity, cities, style }) {
  return (
    <div className={styles.modalBg}>
      <div className={styles.modalContainer} style={style}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            {cities[activeCity].isFetched && cities[activeCity].weather.location.name}
          </div>
          <div className={styles.modalClose} onClick={toggleModal}>X</div>
        </div>
        {
          cities[activeCity].isFetched ?
            <ModalBody forecastday={cities[activeCity].weather.forecast.forecastday}/> :
            <Icon type='spinner' width='64' height='64' className={styles.loadingSpinner}/>
        }
      </div>
    </div>
  );
}

Modal.propTypes = {
  toggleModal: func.isRequired,
  activeCity: number.isRequired,
  cities: array.isRequired,
  style: object
};

const mapStateToProps = (state) => ({ cities: state.cities });

export default connect(
  mapStateToProps
)(Modal);