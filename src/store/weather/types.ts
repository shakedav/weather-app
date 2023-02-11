import { I5DaysForeCastRequest } from "../../interfaces/five-days-forecast-request.interface";
import { I5DaysForecast } from "../../interfaces/forecast.interface";
import { ILocationData } from "../../interfaces/location-meta-data.interface";
import { ILocationWeather } from "../../interfaces/location-weather.interface";
import { FETCH_5_DAYS_FORECAST_REQUEST, FETCH_5_DAYS_FORECAST_SUCCESS, FETCH_LOCATION_COORDS_REQUEST, FETCH_LOCATION_COORDS_SUCCESS, FETCH_LOCATION_KEY_REQUEST, FETCH_LOCATION_KEY_SUCCESS, FETCH_LOCATION_WEATHER_REQUEST, FETCH_LOCATION_WEATHER_SUCCESS } from "./actionTypes";
import { IPosition } from "./location.helper";
  
  
  export interface WeatherState {
    locationWeather: ILocationWeather | null;
    location5DaysForecast: I5DaysForecast | null;
    currentLocationCoordinates: IPosition | null;
    locationKey: ILocationData | null;
    error: string | null;
  }
  
  export type FetchLocationWeatherRequest = {
    type: typeof FETCH_LOCATION_WEATHER_REQUEST;
    payload: string
  };
  
  export type FetchLocationWeatherSuccess = {
    type: typeof FETCH_LOCATION_WEATHER_SUCCESS;
    payload: ILocationWeather;
  };

  export type FetchLocationKeyRequest = {
    type: typeof FETCH_LOCATION_KEY_REQUEST;
    payload: IPosition
  }

  export type FetchLocationKeySuccess = {
    type: typeof FETCH_LOCATION_KEY_SUCCESS;
    payload: ILocationData
  }

  export type FetchLocationCoordsRequest = {
    type: typeof FETCH_LOCATION_COORDS_REQUEST
  }

  export type FetchLocationCoordsSuccess = {
    type: typeof FETCH_LOCATION_COORDS_SUCCESS
    payload: IPosition
  }

  export type Fetch5DaysForecastRequest = {
    type: typeof FETCH_5_DAYS_FORECAST_REQUEST;
    payload: I5DaysForeCastRequest;
  }

  export type Fetch5DaysForecastSuccess = {
    type: typeof FETCH_5_DAYS_FORECAST_SUCCESS
    payload: I5DaysForecast
  }

  export type WeatherActions =
    | FetchLocationWeatherRequest
    | FetchLocationWeatherSuccess
    | FetchLocationKeyRequest
    | FetchLocationKeySuccess
    | FetchLocationCoordsRequest
    | FetchLocationCoordsSuccess
    | Fetch5DaysForecastRequest
    | Fetch5DaysForecastSuccess