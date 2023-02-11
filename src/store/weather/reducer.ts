import {
  FETCH_5_DAYS_FORECAST_REQUEST,
  FETCH_5_DAYS_FORECAST_SUCCESS,
  FETCH_LOCATION_COORDS_REQUEST,
  FETCH_LOCATION_COORDS_SUCCESS,
    FETCH_LOCATION_KEY_REQUEST,
    FETCH_LOCATION_KEY_SUCCESS,
    FETCH_LOCATION_WEATHER_REQUEST,
    FETCH_LOCATION_WEATHER_SUCCESS,
  } from "./actionTypes";
  
  import { WeatherActions, WeatherState } from "./types";
  
  const initialState: WeatherState = {
    locationWeather: null,
    currentLocationCoordinates: null,
    location5DaysForecast: null,
    locationKey: null,
    error: null,
  };
  
  export default (state = initialState, action: WeatherActions) => {
    switch (action.type) {
      case FETCH_LOCATION_WEATHER_REQUEST:
        return {
          ...state,
          pending: true,
        };
      case FETCH_LOCATION_WEATHER_SUCCESS:
        return {
          ...state,
          pending: false,
          locationWeather: action.payload,
          error: null,
        };
      case FETCH_5_DAYS_FORECAST_REQUEST:
        return {
          ...state,
          pending: true,
        };
      case FETCH_5_DAYS_FORECAST_SUCCESS:
        return {
          ...state,
          pending: false,
          location5DaysForecast: action.payload,
          error: null,
        };
      case FETCH_LOCATION_COORDS_REQUEST: 
        return {
          ...state,
          pending: true,
        };
      case FETCH_LOCATION_COORDS_SUCCESS: 
        console.log('success', action.payload)
        return {
          ...state,
          pending: false,
          currentLocationCoordinates: action.payload,
          error: null,
        }
      case FETCH_LOCATION_KEY_REQUEST: 
        return {
          ...state,
          pending: true,
        };
      case FETCH_LOCATION_KEY_SUCCESS:
        return {
          ...state,
          pending: false,
          locationKey: action.payload,
          error: null,
        }

      default:
        return {
          ...state,
        };
    }
  };
  