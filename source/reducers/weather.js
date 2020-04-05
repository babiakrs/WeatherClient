import initialState from './initialState.js';
import {
  REQUEST_FORECAST,
  RECEIVE_FORECAST,
  RECEIVE_FORECAST_FAILED
} from 'Actions/types.js';

export default (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_FORECAST: {
      let citiesCopy = [ ...state.cities ];

      if (!citiesCopy[action.cityId]) {
        citiesCopy[action.cityId] = {};
      }

      citiesCopy[action.cityId].isFetched = false;

      return {
        ...state,
        cities: [
          ...citiesCopy
        ]
      };
    }

    case RECEIVE_FORECAST: {
      let citiesCopy = [ ...state.cities ];

      citiesCopy[action.cityId] = {
        isFetched: true,
        weather: action.weather
      };

      return {
        ...state,
        cities: [
          ...citiesCopy
        ]
      };
    }

    case RECEIVE_FORECAST_FAILED: {
      let citiesCopy = [ ...state.cities ];

      citiesCopy[action.cityId] = {
        isFetched: false,
        error: action.err
      };

      return {
        ...state,
        cities: [
          ...citiesCopy
        ]
      };
    }

    default: {
      return state;
    }
  }
};