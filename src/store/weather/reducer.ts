import {
  FETCH_5_DAYS_FORECAST_REQUEST,
  FETCH_5_DAYS_FORECAST_SUCCESS,
  FETCH_LOCATION_COORDS_REQUEST,
  FETCH_LOCATION_COORDS_SUCCESS,
    FETCH_LOCATION_DATA_REQUEST,
    FETCH_LOCATION_DATA_SUCCESS,
    FETCH_LOCATION_WEATHER_REQUEST,
    FETCH_LOCATION_WEATHER_SUCCESS,
  } from "./actionTypes";
  
  import { WeatherActions, WeatherState } from "./types";
  
  const initialState: WeatherState = {
    locationWeather: null,
    isLocationWeatherPending: false,
    currentLocationCoordinates: null,
    isCurrentLocationCoordinatesPending: false,
    location5DaysForecast: null,
    isLocation5DaysForecastPending: false,
    locationData: null,
    isLocationDataPending: false,
    error: null,
  };
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default (state = initialState, action: WeatherActions) => {
    switch (action.type) {
      case FETCH_LOCATION_WEATHER_REQUEST:
        return {
          ...state,
          isLocationWeatherPending: true,
        };
      case FETCH_LOCATION_WEATHER_SUCCESS:
        return {
          ...state,
          isLocationWeatherPending: false,
          locationWeather: action.payload,
          error: null,
        };
      case FETCH_5_DAYS_FORECAST_REQUEST:
        return {
          ...state,
          isLocation5DaysForecastPending: true,
        };
      case FETCH_5_DAYS_FORECAST_SUCCESS:
        return {
          ...state,
          isLocation5DaysForecastPending: false,
          location5DaysForecast: action.payload,
          error: null,
        };
      case FETCH_LOCATION_COORDS_REQUEST: 
        return {
          ...state,
          isCurrentLocationCoordinatesPending: true,
        };
      case FETCH_LOCATION_COORDS_SUCCESS: 
        return {
          ...state,
          isCurrentLocationCoordinatesPending: false,
          currentLocationCoordinates: action.payload,
          error: null,
        }
      case FETCH_LOCATION_DATA_REQUEST: 
        return {
          ...state,
          isLocationDataPending: true,
        };
      case FETCH_LOCATION_DATA_SUCCESS:
        return {
          ...state,
          isLocationDataPending: false,
          locationData: action.payload,
          error: null,
        }
      default:
        return {
          ...state,
        };
    }
  };
  