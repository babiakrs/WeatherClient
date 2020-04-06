import {
  REQUEST_FORECAST,
  RECEIVE_FORECAST,
  RECEIVE_FORECAST_FAILED
} from './types.js';
import WeatherService from 'Services/weather';

const requestForecast = (cityId) => ({
  type: REQUEST_FORECAST,
  cityId
});

const receiveForecast = (cityId, weather) => ({
  type: RECEIVE_FORECAST,
  cityId,
  weather
});

const receiveForecastFailed = (cityId, err) => ({
  type: RECEIVE_FORECAST_FAILED,
  cityId,
  err
});

export const fetchForecast = (coords, cityId) => {
  return (dispatch) => {
    dispatch(requestForecast(cityId));

    const weatherService = new WeatherService;
    weatherService.getForecast(coords).then((res) => {
      if (res.error) {
        dispatch(receiveForecastFailed(cityId, res.error));
      }

      dispatch(receiveForecast(cityId, res));
    });
  };
};